import React from 'react'

const CustomTable = ({ titles, body }) => {
    return (
        <table>
            <tbody>
                <tr className='bg-[#e2e8f0] w-[500px] '>
                    {
                        titles.map((title, index) => {
                            return (
                                <td key={index} style={{
                                    fontSize: "12px",
                                    padding: "30px",
                                    paddingLeft: "100px",
                                    fontWeight: "bold",
                                    color: "#334257",
                                    textAlign: "left",
                                }}>
                                    {title}
                                </td>
                            )
                        })
                    }
                </tr>
                {body}
            </tbody>
        </table>
    )
}


export const CustomTableRow = ({children}) => {
    return (
        <td style={{
            paddingLeft: "110px",
            paddingRight: "70px",
            paddingTop: "50px",
            fontSize: "14px",
            color: "#677788",
            
        }}>
            {children}
        </td>
    )
}



export default CustomTable
