import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNotifications } from '../slices/notifications';
import { notify } from '../slices/notificationSlice';
import axios from '../axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/ui/PageContainer';
import Card from '../components/ui/Card';
import PrimaryButton from '../components/ui/PrimaryButton';
import InputField from '../components/ui/InputField';
import TextArea from '../components/ui/TextArea';
import FileInput from '../components/ui/FileInput';

export const PostQuestion = () => {
  const [question, setQusetion] = useState('');
  const [subject, setSubject] = useState('');
  const [image, setImage] = useState(null);
  const username = useSelector((state) => state.authUser.user.name);
  const userId = useSelector((state) => state.authUser.user._id);
  const navigate = useNavigate();
  useNotifications();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('question', question);
    form.append('subject', subject);
    form.append('username', username);
    form.append('user_id', userId);
    if (image) form.append('image', image);
    try {
      await axios.post('/api/questions/postQn', form, { headers: { 'Content-Type': 'multipart/form-data' } });
      dispatch(notify({ message: 'Question Posted Successfully', type: 'success' }));
      navigate('/questions');
    } catch (err) {
      dispatch(notify({ message: 'error: Question Not Posted ', type: 'error' }));
      navigate('/questions');
    }
  };

  return (
    <PageContainer>
      <Card className="max-w-xl mx-auto p-6">
        <form onSubmit={handleSubmit}>
          <TextArea label="What's your question?" required rows={8} value={question} onChange={(e) => setQusetion(e.target.value)} placeholder="Describe the problem and include any context" />
          <InputField label="Subject" required value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g., Data Structures" />
          <FileInput label="Upload an image (optional)" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          <div className="mt-6">
            <PrimaryButton type="submit" className="w-full">Post</PrimaryButton>
          </div>
        </form>
      </Card>
    </PageContainer>
  );
};