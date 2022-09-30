import React, { memo }  from "react";
import ReactQuill  from "react-quill";

const Editor =  ({ onChange, value}) => {

	console.log(value)

	const modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[{ list: "ordered" }, { list: "bullet" }],
		]
	};

	const formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
		"link",
		"image"
	];


	return (
		<ReactQuill
			theme="snow"
			modules={modules}
			formats={formats}
			value={value}
			onChange={onChange}
		/>
	);
};

export default memo(Editor)

