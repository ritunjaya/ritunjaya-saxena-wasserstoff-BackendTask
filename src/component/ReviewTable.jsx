
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import CustomTable, { CustomTableRow } from "./CustomTable";
function ReviewTable() {

    const [data, setData] = useState([]);
    const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dwhyyymds/image/upload"
    useEffect(() => {
        async function fetchData() {
            const user = JSON.parse(localStorage.getItem("user"));
            const userId = user._id;
            const formData = new FormData();
            formData.append("userId", userId);


            const fetchedData = await fetch("https://wasserstoff-backendtask-35f0.onrender.com/user/status", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId: userId }),
            });
            const newData = await fetchedData.json();
            const ree = newData.images.map((item) => {
                return {
                    _id: item._id,
                    name: item.userId.name,
                    image: `${CLOUDINARY_BASE_URL}/${item.imagePath}`,
                    annotation: item.annotation,
                    status: item.status

                }
            });

            setData(ree);
        }

        fetchData();

    }, [])


    const TableRow = (data) => {
        return (
            <React.Fragment>
                {
                    data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <CustomTableRow>
                                    {index + 1}
                                </CustomTableRow>
                                <CustomTableRow>
                                    <div className="flex flex-row justify-start w-[100px] h-[50px]">
                                        <img
                                            src={item.image}
                                            alt="user"
                                            className="object-cover"
                                        />
                                    </div>
                                </CustomTableRow>
                                <CustomTableRow>
                                    {item.name}
                                </CustomTableRow>
                                <CustomTableRow>
                                    {item.status}
                                </CustomTableRow>
                                <CustomTableRow>
                                    <div className="border px-4 py-2 overflow-y-scroll scrollbar-hide h-[200px]">
                                        {
                                            item.annotation.map((tag, index) => {
                                                return (
                                                    <p>{tag.name}</p>
                                                )

                                            })
                                        }
                                    </div>
                                </CustomTableRow>
                                <CustomTableRow>
                                    <button className="bg-blue-500 text-white px-2 hover:bg-blue-600 py-1 rounded">View</button>
                                </CustomTableRow>
                            </tr>
                        )
                    })
                }
            </React.Fragment>
        )
    };


    const titles = [
        "SL",
        "Image",
        "User Name",
        "Status",
        "Annotation",
        "Action"
    ]

    return (
        <div className=" w-full  ">
            <CustomTable
                titles={titles}
                body={TableRow(data)}
            />
        </div>
    )
};
export default ReviewTable;




