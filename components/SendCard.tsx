// "use client"
// import { Button } from "../ui/button";
// import { Card } from "../ui/card";
// import { Center } from "../ui/Center";
// import { TextInput } from "../ui/textinput";
// import { useState } from "react";
// import { p2pTransfer } from "../actions/p2pTransfer";

// export function SendCard() {
//     const [number, setNumber] = useState("");
//     const [amount, setAmount] = useState("");

//     return <div className="h-[90vh]">
//         <Center>
//             <Card title="Send">
//                 <div className="min-w-100 pt-2">
//                     <TextInput placeholder={"Number"} label="Number" onChange={(value) => {
//                         setNumber(value)
//                     }} />
//                     <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
//                         setAmount(value)
//                     }} />
//                     <div className="pt-4 flex justify-center">
//                         <Button onClick={async () => {
//                             await p2pTransfer(number, Number(amount) * 100)
//                         }}>Send</Button>
//                     </div>
//                 </div>
//             </Card>
//         </Center>
//     </div>
// }



"use client"
import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Center } from "../ui/Center";
import { TextInput } from "../ui/textinput";
import { p2pTransfer } from "../actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSend = async () => {
        setStatus("idle");
        try {
            await p2pTransfer(number, Number(amount) * 100);
            setStatus("success");
            setMessage("Transfer successful!");
        } catch (err: any) {
            console.error(err);
            setStatus("error");
            setMessage(err?.message || "Transfer failed.");
        }
    };

    return (
        <div className="h-[90vh]">
            <Center>
                <Card title="Send">
                    <div className="min-w-100 pt-2">
                        <TextInput
                            placeholder="Number"
                            label="Number"
                            onChange={(value) => setNumber(value)}
                        />
                        <TextInput
                            placeholder="Amount"
                            label="Amount"
                            onChange={(value) => setAmount(value)}
                        />
                        <div className="pt-4 flex justify-center">
                            <Button onClick={handleSend}>Send</Button>
                        </div>
                        {status !== "idle" && (
                            <div
                                className={`pt-4 text-center ${
                                    status === "success" ? "text-green-600" : "text-red-600"
                                }`}
                            >
                                {message}
                            </div>
                        )}
                    </div>
                </Card>
            </Center>
        </div>
    );
}
