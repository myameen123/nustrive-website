import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/navigation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.MuiTableCell-head`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: "center",
  },
  [`&.MuiTableCell-body`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.disabledBackground,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(subject, totalMarks, marksObtained) {
  return { subject, totalMarks, marksObtained };
}

// ];
function ResultCard({ result }) {
  const router = useRouter();
  const rows = [
    createData("Mathematics", result.totalMathQuestions, result.mathScore),
    createData("English", result.totalEnglishQuestions, result.englishScore),
    createData("Intelligence", result.totaliqQuestions, result.iqScore),
  ];

  const onClickHandler = (path) => {
    window.localStorage.removeItem("result");
    router.push(path);
  };
  return (
    <div className="flex justify-center items-center md:items-start h-full">
      <div className="md:w-1/2 bg-white rounded-lg shadow-lg ">
        <h1 className="text-2xl font-bold text-center mt-6 mb-16 underline">
          Result OF NSUT MOCK TEST BY NUSTRRIVE
        </h1>
        <TableContainer component={Paper}>
          <Table sx={{ width: "100%" }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>Subject</StyledTableCell>
                <StyledTableCell>Total Marks</StyledTableCell>
                <StyledTableCell>Marks Obtained</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.subject}>
                  <StyledTableCell component="th" scope="row">
                    {row.subject}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.totalMarks}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.marksObtained}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
              <TableRow>
                <StyledTableCell component="th" scope="row">
                  Total
                </StyledTableCell>
                <StyledTableCell align="center">
                  {result.totalQuestions}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {result.totalScore}
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell />
                <StyledTableCell align="center">Percentage</StyledTableCell>
                <StyledTableCell align="center">
                  {result.resultPersentage?.toFixed(2)}%
                </StyledTableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div className=" my-8 flex justify-between px-4">
          <button
            className=" bg-[#111256] py-2 px-4 w-fit text-white rounded-[5px] hover:bg-[#111256]/90"
            onClick={() => onClickHandler("/")}
          >
            Go to Home
          </button>
          <button
            className=" bg-[#111256] py-2 px-4 w-fit text-white rounded-[5px] hover:bg-[#111256]/90"
            onClick={() => onClickHandler("/mock-test")}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
