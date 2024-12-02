import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
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
    Button
} from '@mui/material';
import {AddResidentFormData, Resident, Residents} from "../../types";
import AddResidentModal from '../modals/AddResidentModal';
import ResidentProgramsModal from '../modals/ResidentProgramsModal';
import ReadMoreTwoToneIcon from '@mui/icons-material/ReadMoreTwoTone';
import {GET_RESIDENTS} from "../../api/graphql/queries";
import {CREATE_RESIDENT} from "../../api/graphql/mutations";


const ResidentsList = () => {
        const {loading, error, data} = useQuery(GET_RESIDENTS);
        const [openModal, setOpenModal] = useState(false);
        const [openProgramsModal, setOpenProgramsModal] = useState(false);
        const [createResident] = useMutation(CREATE_RESIDENT);
        const [resident, setResident] = useState(data?.residents[0]);


        const handleAddResident = () => {
            setOpenModal(true);
        };

        const handleCloseModal = () => {
            setOpenModal(false);
        };

        const handleAddResidentSubmit = async (formData: AddResidentFormData) => {
            try {
                await createResident({
                    variables: {
                        input: {
                            name: `${formData.firstName} ${formData.lastName}`,
                            preferredName: formData.preferredName,
                            status: formData.status,
                            room: formData.room,
                            firstName: formData.firstName,
                            lastName: formData.lastName,
                            birthDate: formData.birthDate,
                            moveInDate: formData.moveInDate,
                            levelOfCare: formData.levelOfCare,
                            ambulation: formData.ambulation,
                        }
                    },
                    update: (cache, {data: createResidentData}) => {
                        const existingResidents = cache.readQuery<Residents>({
                            query: GET_RESIDENTS
                        });

                        if (existingResidents && createResidentData) {
                            cache.writeQuery({
                                query: GET_RESIDENTS,
                                data: {
                                    residents: [...existingResidents.residents, createResidentData.createResident]
                                }
                            });
                        }
                    }
                });
            } catch (error) {
                console.error('Error adding resident:', error);
            }
        };


        const handleRowClick = async (residentId: number) => {
            const resident = data.residents?.find((resident: any) => resident.id === residentId);

            setResident(resident)
            setOpenProgramsModal(true);
        };


        const handleCloseProgramsModal = () => {
            setOpenProgramsModal(false);
        };

        if (loading) {
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <CircularProgress/>
                </div>
            );
        }

        if (error) {
            return (
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <Typography color="error" variant="h6">
                        Error: Unable to fetch data
                    </Typography>
                </div>
            );
        }

        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                padding: '100px 100px',
                flexDirection: 'column',
                position: 'relative'
            }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddResident}
                    sx={{
                        position: 'absolute',
                        top: 40,
                        right: 100,
                        zIndex: 1
                    }}
                >
                    Add Resident +
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Room</TableCell>
                                <TableCell>Level of care</TableCell>
                                <TableCell>Programs</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.residents.map((resident: Resident) => (
                                <TableRow key={resident.id}>
                                    <TableCell>{resident.id}</TableCell>
                                    <TableCell>{resident.name}</TableCell>
                                    <TableCell>{resident.status}</TableCell>
                                    <TableCell>{resident.room}</TableCell>
                                    <TableCell>{resident.levelOfCare}</TableCell>
                                    <TableCell
                                        onClick={() => handleRowClick(resident.id)}
                                        sx={{cursor: 'pointer', textAlign: 'left'}}
                                    >
                                        <ReadMoreTwoToneIcon
                                            sx={{
                                                fontSize: 24,
                                                color: '#e33b83',
                                                transition: 'color 0.3s ease',
                                                '&:hover': {
                                                    color: 'blue',
                                                },
                                                '&:active': {
                                                    color: 'green',
                                                },
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>

                <AddResidentModal
                    open={openModal}
                    onClose={handleCloseModal}
                    onAddResident={handleAddResidentSubmit}
                />

                <ResidentProgramsModal
                    open={openProgramsModal}
                    onClose={handleCloseProgramsModal}
                    resident={resident}
                />
            </Box>
        );
    }
;

export default ResidentsList;
