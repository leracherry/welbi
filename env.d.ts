interface ImportMetaEnv {
    readonly REACT_APP_API_BASE_URL: string;
    readonly REACT_APP_APPLICANT_EMAIL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}