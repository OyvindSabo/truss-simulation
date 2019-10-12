import React, { useState } from 'react';
import { OnClick } from '../../types';
import Modal from '../modal/Modal';
import { PADDING } from '../../constants/styles';
import Input from '../input/Input';
import Button from '../button/Button';
import { ButtonType } from '../button/types';

interface CreateNewStructureModal {
  active: boolean;
  onOutsideClick: OnClick;
  onCancel: OnClick;
  onSubmit: (data: { name: string; description: string }) => void;
}
const CreateNewStructureModal = ({
  active,
  onOutsideClick,
  onCancel,
  onSubmit,
}: CreateNewStructureModal) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  return (
    <Modal active={active} onOutsideClick={onOutsideClick}>
      <p>CREATE NEW STRUCTURE</p>
      <table style={{ borderCollapse: 'collapse' }}>
        <tr>
          <td style={{ padding: `${PADDING}px` }}>NAME</td>
          <td style={{ width: '100%' }}>
            <Input
              value={name}
              placeholder="GIVE YOUR STRUCTURE A NAME"
              onInput={(event: any) => {
                setName(event.target.value);
              }}
            />
          </td>
        </tr>
        <tr>
          <td style={{ padding: `${PADDING}px` }}>DESCRIPTION</td>
          <td style={{ width: '100%' }}>
            <Input
              value={description}
              placeholder="DESCRIBE YOUR STRUCTURE"
              onInput={(event: any) => {
                setDescription(event.target.value);
              }}
            />
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <Button
              buttonType={ButtonType.Primary}
              style={{ width: '50%' }}
              onClick={() => onSubmit({ name, description })}
            >
              START BUILDING
            </Button>
            <Button
              buttonType={ButtonType.Danger}
              style={{ width: '50%' }}
              onClick={onCancel}
            >
              CANCEL
            </Button>
          </td>
        </tr>
      </table>
    </Modal>
  );
};

export default CreateNewStructureModal;
