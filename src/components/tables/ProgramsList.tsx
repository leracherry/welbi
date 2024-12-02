import React, {useState} from 'react';
import { useMutation, useQuery} from '@apollo/client';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
    Box,
    Button,
} from '@mui/material';
import {format} from 'date-fns';
import {Program, ProgramFormData} from "../../types";
import AddProgramModal from "../modals/AddProgramModal";
import {GET_PROGRAMS} from "../../api/graphql/queries";
import {CREATE_PROGRAM} from "../../api/graphql/mutations";


const ProgramsList = () => {
    const {loading, error, data} = useQuery(GET_PROGRAMS);
    const [openModal, setOpenModal] = useState(false);
    const [createProgram] = useMutation(CREATE_PROGRAM);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleProgramSubmit = async (formData: ProgramFormData) => {
        try {
            await createProgram({
                variables: {
                    input: {
                        ...formData,
                        start: new Date(formData.start).toISOString(),
                    },
                },
                update: (cache, {data: createProgramData}) => {
                    if (!createProgramData) return;

                    const existingPrograms = cache.readQuery<{ programs: Program[] }>({
                        query: GET_PROGRAMS,
                    });

                    const newProgram = {
                        ...createProgramData.createProgram,
                        attendance: createProgramData.createProgram.attendance || [],
                    };

                    if (existingPrograms) {
                        cache.writeQuery({
                            query: GET_PROGRAMS,
                            data: {
                                programs: [...existingPrograms.programs, newProgram],
                            },
                        });
                    }
                },
            });
        } catch (err) {
            console.error('Error creating program:', err);
        }
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <Typography color="error" variant="h6">
                    Error: Unable to fetch data
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                padding: '100px 100px',
                position: 'relative',
            }}
        >
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
                sx={{
                    position: 'absolute',
                    top: 40,
                    right: 100,
                }}
            >
                Add Program +
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Start</TableCell>
                            <TableCell>Attendance</TableCell>
                            <TableCell>Location</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.programs.map((program: Program) => (
                            <TableRow key={program.id}>
                                <TableCell>{program.id}</TableCell>
                                <TableCell>{program.name}</TableCell>
                                <TableCell>{FormattedDate(program.start)}</TableCell>
                                <TableCell>{program.attendance.length}</TableCell>
                                <TableCell>{program.location}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <AddProgramModal
                open={openModal}
                onClose={handleCloseModal}
                onAddProgram={handleProgramSubmit}
            />
        </Box>
    );
};

export const FormattedDate = (dateString: string) => format(new Date(dateString), 'MMMM dd, yyyy, h:mm a');

export default ProgramsList;