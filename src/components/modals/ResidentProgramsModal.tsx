import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from '@mui/material';
import {Attendance, Program, Resident} from "../../types";
import {useQuery, useMutation} from "@apollo/client";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {useState, useEffect} from "react";
import {SET_ATTENDANCE} from "../../api/graphql/mutations";
import {GET_PROGRAMS} from "../../api/graphql/queries";


interface ResidentProgramsModalProps {
    open: boolean;
    onClose: () => void;
    resident: Resident;
}


const ResidentProgramsModal = ({open, onClose, resident}: ResidentProgramsModalProps) => {
    const {loading, error, data, refetch} = useQuery(GET_PROGRAMS);
    const [setAttendance] = useMutation(SET_ATTENDANCE, {
        onCompleted: () => {
            refetch();
        },
    });
    const [activePrograms, setActivePrograms] = useState<Program[]>([]);
    const [inactivePrograms, setInactivePrograms] = useState<Program[]>([]);

    useEffect(() => {
        if (data?.programs) {
            const residentAttendance = data?.programs
                .flatMap((program: Program) => program?.attendance || [])
                .filter((att: Attendance) => att.residentId === resident?.id);

            const activeProgramIds = residentAttendance?.map((att: Attendance) => att?.programId);

            setActivePrograms(data.programs.filter((program: Program) =>
                activeProgramIds.includes(program?.id)
            ));

            setInactivePrograms(data.programs.filter((program: Program) =>
                !activeProgramIds.includes(program?.id)
            ));
        }
    }, [data, resident?.id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading programs</div>;

    const handleSetAttendance = async (programId: string) => {
        try {
            await setAttendance({
                variables: {
                    input: {
                        status: 'Active',
                        residentId: resident.id,
                        programId,
                    },
                },
            });
        } catch (e) {
            console.error('Error setting attendance:', e);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                Programs of <span style={{color: '#1875d2', fontWeight: 'bold'}}>{resident?.name}</span>
            </DialogTitle>
            <DialogContent>
                <div>
                    <h3>Active Programs</h3>
                    {activePrograms.length === 0 ? (
                        <div>No active programs</div>
                    ) : (
                        activePrograms?.map((program: Program) => (
                            <div key={program.id} style={{display: 'flex', alignItems: 'center'}}>
                                <CheckCircleIcon style={{color: 'green', marginRight: '8px'}}/>
                                {program.name}
                            </div>
                        ))
                    )}
                </div>

                <div>
                    <h3>Other Programs</h3>
                    {inactivePrograms.length === 0 ? (
                        <div>No other programs available</div>
                    ) : (
                        inactivePrograms?.map((program: Program) => (
                            <div key={program.id} style={{display: 'flex', alignItems: 'center'}}>
                                <CheckCircleOutlineIcon
                                    style={{color: 'grey', marginRight: '8px', cursor: 'pointer'}}
                                    onClick={() => handleSetAttendance(program.id)}
                                />
                                {program.name}
                            </div>
                        ))
                    )}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};


export default ResidentProgramsModal;
