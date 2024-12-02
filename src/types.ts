export interface Resident {
    id: number;
    name: string;
    age: number;
    status: string;
    room: string;
    levelOfCare: string;
}

export interface Residents {
    residents: Resident[];
}

export enum LevelOfCare {
    INDEPENDENT = 'INDEPENDENT',
    ASSISTED = 'ASSISTED',
    MEMORY = 'MEMORY',
    LONGTERM = 'LONGTERM',
}

export interface Program {
    id: string;
    name: string;
    start: string;
    attendance: Attendance[];
    location: string;
    parentId: number;
    allDay: boolean;
    tags: string[];
    end: string;
    dimension: string;
    facilitators: string[];
    levelOfCare: LevelOfCare[];
    hobbies: string[];
    isRepeated: boolean
    recurrence: Recurrence;
}

export interface Attendance {
    program: Program;
    programId: number;
    resident: Resident;
    residentId: number;
    status: string;
}

export interface AddProgramModalProps {
    open: boolean;
    onClose: () => void;
    onAddProgram: (formData: {
        name: string;
        location: string;
        start: string;
        end: string;
        allDay: boolean;
        dimension: string;
        levelOfCare: string;
        facilitators: string[];
        hobbies: string[];
        tags: string[];
    }) => void;
}

export interface ProgramFormData {
    name: string;
    location: string;
    start: string;
    end: string;
    allDay: boolean;
    dimension: string;
    levelOfCare: string;
    facilitators: string[];
    hobbies: string[];
    tags: string[];
}

export interface AddResidentFormData {
    firstName: string;
    lastName: string;
    preferredName: string;
    status: string;
    room: string;
    birthDate: string;
    moveInDate: string;
    levelOfCare: string;
    ambulation: string;
}

export interface AddResidentModalProps {
    open: boolean;
    onClose: () => void;
    onAddResident: (formData: {
        firstName: string;
        lastName: string;
        preferredName: string;
        status: string;
        room: string;
        birthDate: string;
        moveInDate: string;
        levelOfCare: string,
        ambulation: string;
    }) => void;
}

export type Recurrence = {
    type: string;
}

