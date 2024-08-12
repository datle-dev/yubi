import { FaArrowRotateLeft } from 'react-icons/fa6';
import Button from './Button';

export default function ResetButton({ onClickReset }) {
  return (
    <div className="mt-4 mb-8">
      <Button
        icon={<FaArrowRotateLeft />}
        text='reset'
        onClick={onClickReset}
        isActive={false}
      />
    </div>
  );
}
