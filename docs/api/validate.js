// This script is loaded by validate.html to process license validation
document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const key = urlParams.get('key');
    const hwid = urlParams.get('hwid');
    
    let response = {
        success: false,
        message: "Missing parameters",
        data: null
    };
    
    if (key && hwid) {
        try {
            // Load the list of valid keys using full URL path
            const validKeysResponse = await fetch('https://vrzoz.github.io/pointblank-macro/api/valid-keys.json');
            const validKeysData = await validKeysResponse.json();
            const validKeys = validKeysData.keys || [];
            
            // Check if the key is valid
            if (validKeys.includes(key)) {
                // In a real implementation, we would check if the key is already activated
                // and if it's used on another machine. For this demo, we'll always return success.
                response = {
                    success: true,
                    message: "License key is valid",
                    data: {
                        key: key,
                        hwid: hwid,
                        activated_at: new Date().toISOString(),
                        last_checked: new Date().toISOString()
                    }
                };
            } else {
                response = {
                    success: false,
                    message: "Invalid license key",
                    data: null
                };
            }
        } catch (error) {
            response = {
                success: false,
                message: "Error validating license: " + error.message,
                data: null
            };
        }
    }
    
    // Display the response
    document.getElementById('response').textContent = JSON.stringify(response, null, 2);
    
    // Set the appropriate class based on the response
    const responseContainer = document.getElementById('responseContainer');
    responseContainer.className = response.success ? 'success' : 'error';
}); 