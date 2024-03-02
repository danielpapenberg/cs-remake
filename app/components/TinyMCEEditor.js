import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(
    () => import('@tinymce/tinymce-react').then(mod => mod.Editor),
    { ssr: false }
);

const TinyMCEEditor = ({ onEditorChange, initialContent }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        if (editorRef.current && initialContent) {
            editorRef.current.setContent(initialContent);
        }
    }, [initialContent]);

    return (
        <>            
            <script src="https://cdn.tiny.cloud/1/lxk0ecg40msycb0geyz13nsgx3c5n9ri2nclj2jpj5is23a3/tinymce/6/tinymce.min.js" referrerPolicy="origin"></script>
            <Editor
                apiKey='lxk0ecg40msycb0geyz13nsgx3c5n9ri2nclj2jpj5is23a3'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={initialContent || "<p>This is the initial content of the editor.</p>"}
                init={{
                    plugins: 'anchor autolink charmap codesample emoticons image link lists searchreplace visualblocks wordcount',
                    toolbar: 'undo redo | blocks fontsize | bold italic underline strikethrough | link | align lineheight | tinycomments | numlist bullist indent outdent | emoticons charmap | removeformat',
                    content_css: 'tinymce-5-dark'
                }}
                onEditorChange={onEditorChange}
            />
        </>
    );
};

export default TinyMCEEditor;
