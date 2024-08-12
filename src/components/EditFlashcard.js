import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './EditFlashcard.css';
import { Link } from 'react-router-dom';
import right from "./hand-right.png";

// Extracted Button component to avoid repetitive code
const ActionButton = React.memo(({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
));

const FlashcardSection = React.memo(({ title, onSubmit, inputs, buttonText }) => (
  <div className={title}>
    <h2>{title}</h2>
    <div className="input">
      {inputs.map(({ type, placeholder, value, onChange }, index) => (
        <input
          key={index}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ))}
      {/*  */}
      <ActionButton onClick={onSubmit}>{buttonText}</ActionButton>
    </div>
  </div>
));

export default function EditFlashcard() {
  // States for Add section
  const [addQuestionContent, setAddQuestionContent] = useState('');
  const [addAnswerContent, setAddAnswerContent] = useState('');

  // States for Edit section
  const [editId, setEditId] = useState('');
  const [editQuestionContent, setEditQuestionContent] = useState('');
  const [editAnswerContent, setEditAnswerContent] = useState('');

  // State for Delete section
  const [deleteId, setDeleteId] = useState('');

  const handleAdd = useCallback(async () => {
    try {
      const response = await axios.post('https://flashbackend-9904.onrender.com/add', {
        Question_Content: addQuestionContent, 
        Answer_Content: addAnswerContent,
      });
      alert(response.data.message);
      resetAddForm();
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item');
    }
  }, [addQuestionContent, addAnswerContent]);

  const handleEdit = useCallback(async () => {
    try {
      const response = await axios.put(`https://flashbackend-9904.onrender.com/edit/${editId}`, {
        Question_Content: editQuestionContent,
        Answer_Content: editAnswerContent,
      });
      alert(response.data.message);
      resetEditForm();
    } catch (error) {
      console.error('Error editing item:', error);
      alert('Failed to edit item');
    }
  }, [editId, editQuestionContent, editAnswerContent]);

  const handleDelete = useCallback(async () => {
    try {
      const response = await axios.delete(`https://flashbackend-9904.onrender.com/delete/${deleteId}`);
      alert(response.data.message);
      resetDeleteForm();
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    }
  }, [deleteId]);

  const resetAddForm = () => {
    setAddQuestionContent('');
    setAddAnswerContent('');
  };

  const resetEditForm = () => {
    setEditId('');
    setEditQuestionContent('');
    setEditAnswerContent('');
  };

  const resetDeleteForm = () => {
    setDeleteId('');
  };

  return (
    <div className="EditFlashCard">
      <h1 className="title">Edit Page</h1>
      <div className="Main">
      <img className="RightHan" src={right}></img>
        <ActionButton>
          <Link to="/">User Page</Link>
        </ActionButton>
      </div>
      <div className="Edit-Display">
      <FlashcardSection
        title="Add Flashcard"
        onSubmit={handleAdd}
        inputs={[
          {
            type: 'text',
            placeholder: 'Question Content',
            value: addQuestionContent,
            onChange: (e) => setAddQuestionContent(e.target.value),
          },
          {
            type: 'text',
            placeholder: 'Answer Content',
            value: addAnswerContent,
            onChange: (e) => setAddAnswerContent(e.target.value),
          },
        ]}
        buttonText="Add Flashcard"
      />

      <FlashcardSection
        title="Edit Flashcard"
        onSubmit={handleEdit}
        inputs={[
          {
            type: 'text',
            placeholder: 'Flashcard ID',
            value: editId,
            onChange: (e) => setEditId(e.target.value),
          },
          {
            type: 'text',
            placeholder: 'New Question Content',
            value: editQuestionContent,
            onChange: (e) => setEditQuestionContent(e.target.value),
          },
          {
            type: 'text',
            placeholder: 'New Answer Content',
            value: editAnswerContent,
            onChange: (e) => setEditAnswerContent(e.target.value),
          },
        ]}
        buttonText="Edit Flashcard"
      />

      <FlashcardSection
        title="Delete Flashcard"
        onSubmit={handleDelete}
        inputs={[
          {
            type: 'text',
            placeholder: 'Flashcard ID',
            value: deleteId,
            onChange: (e) => setDeleteId(e.target.value),
          },
        ]}
        buttonText="Delete Flashcard"
      />
      </div>
      
    </div>
  );
}
