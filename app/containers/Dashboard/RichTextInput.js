import React, { useState } from 'react';
// import { Editor, EditorState } from 'draft-js';
// import 'draft-js/dist/Draft.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import PropTypes from 'prop-types';

export default function RichTextInput({
  value = {},
  onChange,
  setRichTextInParent,
}) {
  //   const [editorState, setEditorState] = React.useState(() =>
  //     EditorState.createEmpty(),
  //   );

  //   const editor = React.useRef(null);
  //   function focusEditor() {
  //     editor.current.focus();
  const [richTextState, setRichText] = useState(EditorState.createEmpty());

  const onTextChange = richTextValue => {
    setRichText(richTextValue);

    triggerChange();
  };

  const triggerChange = () => {
    // not sure if converting to json with every user letter input is a good idea or not
    const richTextBeforeConversionToJSON = richTextState.getCurrentContent();

    // calling the onchange function that ant injected when this component is used in Form
    // onChange({
    //   richText,
    //   ...value,
    // });
    // setting the parent state
    setRichTextInParent(richTextBeforeConversionToJSON);
  };

  return (
    <div
      style={{ border: '1px solid black' }}
      //   onClick={focusEditor}
    >
      <Editor
        editorState={richTextState}
        // toolbarOnFocus
        // toolbarHidden
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="richEditor"
        toolbar={{
          options: [
            'inline',
            'blockType',
            'list',
            'textAlign',
            'link',
            'embedded',
            // 'emoji',
            'image',
            'remove',
            'history',
          ],

          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
        onEditorStateChange={onTextChange}
      />
    </div>
  );
}

RichTextInput.propTypes = {
  setRichTextInParent: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,

  // getProfile: PropTypes.func.isRequired,
};
