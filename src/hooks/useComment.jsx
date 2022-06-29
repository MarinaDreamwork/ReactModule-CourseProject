import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import commentService from '../services/comment.service';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../store/users';

const CommentContext = React.createContext();

export const useComment = () => {
  return useContext(CommentContext);
};

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { userId } = useParams();
  const currentUserID = useSelector(getCurrentUserId(userId));

  async function createComment(data) {
    const comment = {
      ...data,
      pageId: userId,
      created_at: Date.now(),
      userId: currentUserID._id,
      _id: nanoid()
    };
    try {
      const { content } = await commentService.createComment(comment);
      setComments(prevState => [...prevState, content]);
    } catch (error) {
      errorCatcher(error);
    }
  };

  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  };

  async function removeComment(id) {
    try {
      const { content } = await commentService.removeComment(id);
      if (content === null) {
        setComments(prevState => prevState.filter(item => item._id !== id));
      }
    } catch (error) {
      errorCatcher(error);
    }
  };

  const errorCatcher = (error) => {
    setError(error);
  };

  useEffect(() => {
    getComments();
  }, [userId]);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  return <CommentContext.Provider value={{ createComment, comments, isLoading, getComments, removeComment }}>
    { children }
  </CommentContext.Provider>;
};

CommentProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
