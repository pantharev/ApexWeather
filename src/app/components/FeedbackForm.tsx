import { useState } from "react";

export default function FeedbackForm() {
    const [feedback, setFeedback] = useState("");



    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const first_name = formData.get("first_name");
        const last_name = formData.get("last_name");
        const email = formData.get("email");
        const feedback = formData.get("feedback");
        fetch("/api/feedback", {
            method: "POST",
            body: JSON.stringify({ first_name, last_name, email, feedback }),
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.error(err);
        });
        console.log(feedback);
    }

    return (
        <>
            <div className="rounded-md mb-1 text-black">Feedback Form</div>
            <form className="flex flex-col space-y-5 text-black" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-5 sm:flex-row sm:space-y-0 sm:space-x-5">
                    <div className="flex-1">
                        <label htmlFor="first_name">First Name <span className="text-red-500">*</span></label>
                        <input type="text" id="first_name" name="first_name" className="rounded-md p-2 text-black" />
                    </div>
                    <div>
                        <div className="flex-1">
                            <label htmlFor="last_name">Last Name <span className="text-red-500">*</span></label>
                            <input type="text" id="last_name" name="last_name" className="rounded-md p-2 text-black" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-y-0 sm:space-x-5">
                    <div className="flex-1">
                        <label htmlFor="email">Email <span className="text-red-500">*</span></label>
                        <input type="text" id="email" name="email" className="rounded-md p-2 text-black"/>
                    </div>
                </div>
                <p>Feedback</p>
                <textarea id="feedback" name="feedback" className="rounded-md p-2 text-black" rows={4} cols={50} />
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Submit</button>
            </form>
        </>
    )
}


