import React from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField, Button, Tooltip } from '@mui/material';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';

// import 'emoji-mart/css/emoji-mart.css';

import useChatScreenStyles from './ChatScreenStyles';

interface MessageInputPortionProps {
  submitChat: (userTypedMessage: string) => void;
  setShowEmoji: React.Dispatch<React.SetStateAction<boolean>>;
  showEmoji: boolean;
}

const MessageInputPortion: React.FC<MessageInputPortionProps> = ({
  setShowEmoji,
  showEmoji,
  submitChat,
}) => {
  const { classes } = useChatScreenStyles();

  const initialValue: { message: string } = { message: '' };

  return (
    <div className={classes.MessageInputPortion}>
      <Formik
        validateOnChange={true}
        initialValues={initialValue}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (values.message.length === 0) errors.message = '';
          return errors;
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          submitChat(values.message);

          values.message = '';

          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, setFieldValue, values }) => (
          <Form className={classes.FormPortion}>
            <Field
              style={{
                marginLeft: '20px',
              }}
              type='input'
              name='message'
              fullWidth
              variant='standard'
              autoFocus={true}
              error={!!errors.message}
              helperText={errors.message}
              as={TextField}
            />
            <br />
            <Tooltip title='Emoji'>
              <Button
                className={classes.emojiButton}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEmoji(!showEmoji);
                }}
              >
                😄
              </Button>
            </Tooltip>
            <Button
              disabled={isSubmitting}
              className={classes.sendButton}
              type='submit'
            >
              send
            </Button>
            {showEmoji && (
              <EmojiPicker
                theme={Theme.DARK}
                onEmojiClick={(emojiData: EmojiClickData) =>
                  setFieldValue('message', values.message + emojiData.emoji)
                }
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MessageInputPortion;
