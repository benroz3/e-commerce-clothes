"use client";
import { Fragment, ReactNode, Dispatch } from "react";
import { Dialog, Transition } from "@headlessui/react";

const CommonModal: React.FC<{
  modalTitle: string;
  mainContent: ReactNode;
  showModalTitle: boolean;
  showButtons: boolean;
  show: boolean;
  setShow: () => void;
  dispatch: Dispatch<any>;
  buttonComponent: ReactNode;
}> = ({
  modalTitle,
  mainContent,
  showModalTitle,
  showButtons,
  show,
  setShow,
  dispatch,
  buttonComponent,
}) => {
  return (
    <Transition.Root as={Fragment} show={show}>
      <Dialog
        as="div"
        className={"relative z-10"}
        onClose={() => dispatch(setShow())}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-900"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-900"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel className={"w-screen max-w-md"}>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      {showModalTitle ? (
                        <div
                          className="flex items-start justify-between"
                        >
                          <Dialog.Title>{modalTitle}</Dialog.Title>
                        </div>
                      ) : null}
                      <div className="mt-20">{mainContent}</div>
                    </div>
                    {showButtons ? (
                      <div className="border-t border-gray-300 px-4 py-6 sm:px-6">
                        {buttonComponent}
                      </div>
                    ) : null}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CommonModal;
