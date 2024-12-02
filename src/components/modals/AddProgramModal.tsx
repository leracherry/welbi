import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material';
import {AddProgramModalProps, LevelOfCare} from "../../types";


const AddProgramModal: React.FC<AddProgramModalProps> = ({open, onClose, onAddProgram}) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        start: '',
        end: '',
        allDay: false,
        dimension: '',
        levelOfCare: '',
        facilitators: '',
        hobbies: '',
        tags: ''
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        location: '',
        start: '',
        end: '',
        dimension: '',
        levelOfCare: '',
        facilitators: '',
        hobbies: '',
        tags: '',
    });

    useEffect(() => {
        if (!open) {
            setFormData({
                name: '',
                location: '',
                start: '',
                end: '',
                allDay: false,
                dimension: '',
                levelOfCare: '',
                facilitators: '',
                hobbies: '',
                tags: '',
            });

            setFormErrors({
                name: '',
                location: '',
                start: '',
                end: '',
                dimension: '',
                levelOfCare: '',
                facilitators: '',
                hobbies: '',
                tags: '',
            });
        }
    }, [open]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    };

    const handleLevelOfCareChange = (e: SelectChangeEvent<string>) => {
        const selectedValue = e.target.value;
        const selectedEnumValue = LevelOfCare[selectedValue as keyof typeof LevelOfCare];
        setFormData({
            ...formData,
            levelOfCare: selectedEnumValue ? selectedEnumValue : ''
        });
    };

    // light version of form validation
    //TODO: make full validation
    const validateForm = () => {
        const errors = {
            name: formData.name.trim() === '' ? "Program name is required" : '',
            location: formData.location.trim() === '' ? "Location is required" : '',
            start: formData.start.trim() === '' ? "Start date is required" : '',
            end: formData.end.trim() === '' ? "End date is required" : '',
            dimension: formData.dimension.trim() === '' ? "Dimension is required" : '',
            levelOfCare: formData.levelOfCare.length === 0 ? "Level of Care is required" : '',
            facilitators: formData.facilitators.trim() === '' ? "Facilitators is required" : '',
            hobbies: formData.hobbies.trim() === '' ? "Hobbies is required" : '',
            tags: formData.tags.trim() === '' ? "Tags is required" : '',
        };

        setFormErrors(errors);

        return !Object.values(errors).some((error) => error);
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const programData = {
                ...formData,
                tags: formData.tags.split(',').map((tag) => tag.trim()),
                facilitators: formData.facilitators.split(',').map((facilitator) => facilitator.trim()),
                hobbies: formData.hobbies.split(',').map((hobby) => hobby.trim()),
            };
            onAddProgram(programData);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} sx={{'& .MuiDialog-paper': {width: '400px'}}}>
            <DialogTitle>Add Program</DialogTitle>
            <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <TextField
                    label="Program Name"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                />
                <TextField
                    label="Location"
                    variant="outlined"
                    fullWidth
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    error={!!formErrors.location}
                    helperText={formErrors.location}
                />
                <TextField
                    label="Start Date"
                    variant="outlined"
                    fullWidth
                    name="start"
                    value={formData.start}
                    onChange={handleInputChange}
                    type="datetime-local"
                    error={!!formErrors.start}
                    helperText={formErrors.start}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="End Date"
                    variant="outlined"
                    fullWidth
                    name="end"
                    value={formData.end}
                    onChange={handleInputChange}
                    type="datetime-local"
                    error={!!formErrors.end}
                    helperText={formErrors.end}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formData.allDay}
                            onChange={(e) => setFormData({...formData, allDay: e.target.checked})}
                            color="primary"
                        />
                    }
                    label="All Day"
                />
                <TextField
                    label="Dimension"
                    variant="outlined"
                    fullWidth
                    name="dimension"
                    value={formData.dimension}
                    onChange={handleInputChange}
                    error={!!formErrors.dimension}
                    helperText={formErrors.dimension}
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
                    label="Facilitators (comma separated)"
                    variant="outlined"
                    fullWidth
                    name="facilitators"
                    value={formData.facilitators}
                    onChange={handleInputChange}
                    error={!!formErrors.facilitators}
                    helperText={formErrors.facilitators}
                />
                <TextField
                    label="Hobbies (comma separated)"
                    variant="outlined"
                    fullWidth
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleInputChange}
                    error={!!formErrors.hobbies}
                    helperText={formErrors.hobbies}
                />
                <TextField
                    label="Tags (comma separated)"
                    variant="outlined"
                    fullWidth
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    error={!!formErrors.tags}
                    helperText={formErrors.tags}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add Program
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProgramModal;
