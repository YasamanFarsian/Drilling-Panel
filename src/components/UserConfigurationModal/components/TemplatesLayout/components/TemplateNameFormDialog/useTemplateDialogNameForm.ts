import { useState } from 'react';
import { useIntl } from 'react-intl';
import { TemplateNameFormDialogPropsType } from './TemplateNameFormDialog';

export const useTemplateDialogNameForm = ({
  initialValue,
  onSave,
}: Pick<TemplateNameFormDialogPropsType, 'initialValue' | 'onSave'>) => {
  const [templateName, setTemplateName] = useState(initialValue ?? '');
  const { formatMessage } = useIntl();
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.currentTarget.value;
    setTemplateName(newValue);
  };

  const handleSubmit = () => {
    if (!templateName) {
      return setErrorMessage(
        formatMessage({
          id: 'userConfiguration.settings.templatesLayout.templateNameFormDialog.errorMessage.templateNameRequired',
        }),
      );
    }

    onSave(templateName);
  };

  return {
    templateName,
    handleSubmit,
    errorMessage,
    handleChange,
  };
};
