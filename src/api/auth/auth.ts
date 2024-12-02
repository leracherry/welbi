export async function fetchToken(): Promise<string> {
    const baseURL = process.env.REACT_APP_API_BASE_URL;
    const applicantEmail = process.env.REACT_APP_APPLICANT_EMAIL;
    const response = await fetch(`${baseURL}/start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: applicantEmail}),
    });

    const data = await response.json();

    return data.token;
}


