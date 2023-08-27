import useFormValidation from '../hooks/useFormValidation';
import { FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { createChat, getChats } from '../api/chatApi';

const CreateChat = () => {
  const { errors, isValid, handleChange, handleBlur, resetForm, values } = useFormValidation();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.chat.status);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createChat({ title: values.title }))
      .unwrap()
      .then(() => {
        toast.success('Чат успешно создан! 🎉');
        dispatch(getChats());
        resetForm();
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[500px] p-4 flex flex-col gap-4 shadow-md rounded-2xl"
        noValidate
      >
        <div className="relative flex flex-col gap-2">
          <p>Название</p>
          <input
            value={values.title || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="title"
            placeholder="Название чата"
            disabled={status === 'loading'}
            required
            pattern="[a-zA-Zа-яА-Я0-9ё-\s]{2,}"
            className={`${
              errors.title ? 'invalid:ring-red invalid:ring-2' : ''
            } py-3 pl-4 pr-3 text-sm rounded-lg bg-gray-light ring-violet outline-none focus:ring-2 disabled:opacity-80 transition-all duration-500`}
          />
          <span className="absolute -bottom-[15px] text-xs text-red">
            {errors.title ? 'Имя должен быть не менее 2-х символов' : ''}
          </span>
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || !isValid}
          className="w-full mt-2 py-3 text-white rounded-lg bg-violet ring-violet hover:bg-white hover:text-violet hover:ring-2 disabled:opacity-60 disabled:hover:bg-violet disabled:hover:text-white disabled:hover:ring-0 transition-all duration-500"
        >
          {status === 'loading' ? 'Создаем...' : 'Создать чат'}
        </button>
      </form>
    </div>
  );
};

export default CreateChat;
