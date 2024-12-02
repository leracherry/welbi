import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    InputLabel,
    Select,
    MenuItem, FormControl, SelectChangeEvent
} from '@mui/material';
import {AddResidentModalProps, LevelOfCare} from "../../types";


const AddResidentModal: React.FC<AddResidentModalProps> = ({open, onClose, onAddResident}) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        preferredName: '',
        status: '',
        room: '',
        birthDate: '',
        moveInDate: '',
        levelOfCare: '',
        ambulation: ''
    });

    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        preferredName: '',
        status: '',
        room: '',
        birthDate: '',
        moveInDate: '',
        levelOfCare: '',
        ambulation: ''
    });

    useEffect(() => {
        if (!open) {
            setFormData({
                firstName: '',
                lastName: '',
                preferredName: '',
                status: '',
                room: '',
                birthDate: '',
                moveInDate: '',
                levelOfCare: '',
                ambulation: ''
            });

            setFormErrors({
                firstName: '',
                lastName: '',
                preferredName: '',
                status: '',
                room: '',
                birthDate: '',
                moveInDate: '',
                levelOfCare: '',
                ambulation: ''
            });
        }
    }, [open]);

    // light version of form validation
    //TODO: make full validation
    const validateForm = () => {
        const errors = {
            firstName: formData.firstName.trim() === '' ? "Name is required" : '',
            lastName: formData.lastName.trim() === '' ? "Last name is required" : '',
            preferredName: formData.preferredName.trim() === '' ? "Preferred date is required" : '',
            status: formData.status.trim() === '' ? "Status is required" : '',
            room: formData.room.trim() === '' ? "Room is required" : '',
            levelOfCare: formData.levelOfCare.length === 0 ? "Level of Care is required" : '',
            birthDate: formData.birthDate.trim() === '' ? "Birth date is required" : '',
            moveInDate: formData.moveInDate.trim() === '' ? "Move in date is required" : '',
            ambulation: formData.ambulation.trim() === '' ? "Ambulation is required" : '',
        };

        setFormErrors(errors);

        return !Object.values(errors).some((error) => error);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onAddResident(formData);
            onClose();
        }
    };

    const handleLevelOfCareChange = (e: SelectChangeEvent<string>) => {
        const selectedValue = e.target.value;
        const selectedEnumValue = LevelOfCare[selectedValue as keyof typeof LevelOfCare];
        setFormData({
            ...formData,
            levelOfCare: selectedEnumValue ? selectedEnumValue : ''
        });
    };

    return (
        <Dialog open={open} onClose={onClose} sx={{'& .MuiDialog-paper': {width: '400px'}}}>
            <DialogTitle>Add Resident</DialogTitle>
            <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={!!formErrors.firstName}
                    helperText={formErrors.firstName}
                />
                <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={!!formErrors.lastName}
                    helperText={formErrors.lastName}
                />
                <TextField
                    label="Preferred Name"
                    variant="outlined"
                    fullWidth
                    name="preferredName"
                    value={formData.preferredName}
                    onChange={handleInputChange}
                    error={!!formErrors.preferredName}
                    helperText={formErrors.preferredName}
                />
                <TextField
                    label="Status"
                    variant="outlined"
                    fullWidth
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    error={!!formErrors.status}
                    helperText={formErrors.status}
                />
                <TextField
                    label="Room"
                    variant="outlined"
                    fullWidth
                    name="room"
                    value={formData.room}
                    onChange={handleInputChange}
                    error={!!formErrors.room}
                    helperText={formErrors.room}
                />
                <TextField
                    label="Birth Date"
                    variant="outlined"
                    fullWidth
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    error={!!formErrors.birthDate}
                    helperText={formErrors.birthDate}
                    type="date"
                    InputLabelProps={{shrink: true}}
                />
                <TextField
                    label="Move-in Date"
                    variant="outlined"
                    fullWidth
                    name="moveInDate"
                    value={formData.moveInDate}
                    onChange={handleInputChange}
                    error={!!formErrors.moveInDate}
                    helperText={formErrors.moveInDate}
                    type="date"
                    InputLabelProps={{shrink: true}}
                />
                <FormControl fullWidth>
                    <InputLabel>Level of Care</InputLabel>
                    <Select
                        value={formData.levelOfCare}
                        onChange={handleLevelOfCareChange}
                        label="Level of Care"
                        name="levelOfCare"
                        error={!!formErrors.levelOfCare}
                    >
                        {Object.keys(LevelOfCare).map((key) => (
                            <MenuItem key={key} value={key}>
                                {LevelOfCare[key as keyof typeof LevelOfCare]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Ambulation"
                    variant="outlined"
                    fullWidth
                    name="ambulation"
                    value={formData.ambulation}
                    onChange={handleInputChange}
                    error={!!formErrors.ambulation}
                    helperText={formErrors.ambulation}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add Resident
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddResidentModal;
