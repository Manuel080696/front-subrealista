export const updateUser = async (userName, userData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_APP_BACKEND}/users/${userName}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(userData)
        });

        const json = await response.json();
        if (!response.ok) {
            throw new Error(json.message || "Failed to update user data.");
        }
        return json;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};