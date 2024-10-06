import React from "react";
import ContentForm from "./contentForm";
import { useParams } from "next/navigation";

const NewContent = ({ edit, closeModal, handleAdd, fetchContent }) => {
  const params = useParams()
  return (
    <div>
      <ContentForm
        handleSubmit={handleAdd}
        edit={edit}
        closeModal={closeModal}
        fetchContent={fetchContent}
        content={{title:'',course:params.course,week:params.week, test:'',file:'',link:''}}
      />
      {/* name:'',description:'',category:'',teacher:'' */}
    </div>
  );
};

export default NewContent;
