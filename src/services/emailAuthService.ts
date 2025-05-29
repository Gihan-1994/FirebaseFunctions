interface AuthResponse {
    success: boolean;
    uid?: string;
    email?: string;
    message?: string;
    error?: string;
}

export const emailAuthService = async (
    email: string,
    password: string
   ): Promise<AuthResponse> => {
    try{
        const response = await fetch(
            FirebaseConfig.getallFunctions().emailAuthFunction,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            }
        );
        const result: AuthResponse = await response.json();
        if (result.success) {
            console.log('Auth successful:', result);
            return result;
        } else {
            throw new Error(result.message || 'Unknown error occurred during auth.');
        }

    }
    catch (error) {
        return Promise.reject({
            success: false,
            error: '✂😥Error authing user:'+ error,
        });
    }
}