// networkServiceCall.js

export const networkServiceCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed (${response.status}): ${errorText || "Unknown error"}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Network Service Error:", error);
    throw error; // important so calling code can handle it
  }
};
