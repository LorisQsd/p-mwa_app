/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { LegacyRef, useEffect, useRef } from 'react';

import { PlusIcon } from '@heroicons/react/24/solid';

type ModaleProps = {
    closeModal?: () => void | null;
    children: React.ReactNode;
    notClosable?: boolean;
    reference?: LegacyRef<HTMLDivElement>;
}

export default function Modale({ closeModal = () => null, children, notClosable = false, reference = null }: ModaleProps) {
  // === REFERENCE === //
  const focusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    focusRef.current?.focus();
  }, []);

   // If the escape key is pressed, close the modal
   const handleKeyDown = (
    event: React.KeyboardEvent<HTMLDialogElement | HTMLDivElement>
  ) => {
    if (event.code === 'Escape' && closeModal) {
      closeModal();
    }
  };

  return (
    <dialog
      className="fixed inset-0 z-50 flex flex-wrap items-center justify-center w-screen h-full px-2 py-10 m-0 border-none sm:p-6 bg-black/60"
      onClick={closeModal}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={reference}
        role="dialog"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
        className="relative block max-h-full min-w-[300px] max-w-[1000px] p-4 m-auto mx-4 overflow-y-auto overflow-x-hidden slide rounded-xl pt-10 bg-slate-50"
      >
        {/* If we can close the modal, we want to display the close modal button */}
        {!notClosable && (
          <button
            onClick={closeModal}
            type="button"
            className="absolute w-[24px] aspect-square rounded-full top-2 right-2"
            ref={focusRef}
          >
            <PlusIcon className='duration-300 text-white p-0.5 w-[24px] aspect-square rotate-45 rounded-full bg-red-500 hover:bg-red-700'/>
          </button>
        )}
        {children}
      </div>
    </dialog>
  );
}