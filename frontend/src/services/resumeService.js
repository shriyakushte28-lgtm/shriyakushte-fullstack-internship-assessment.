import api from "./api";

export const uploadResume = (userId, file) => {

    const formData = new FormData();

    formData.append("file", file);

    return api.post(

        `/resume/upload/${userId}`,

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data"

            }

        }

    );

};