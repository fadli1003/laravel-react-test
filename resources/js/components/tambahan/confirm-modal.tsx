
function ModalKonfirmasi({ open, onClose, onConfirm }: {
  open: boolean,
  onClose: () => void,
  onConfirm: () => void
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4 text-center">
            {/* {isEdit ? 'Konfirmasi Update' :  'Konfirmasi Hapus'} */}
            Confirm Delete
        </h2>
        <p className="mb-6">
            {/* {isEdit ? 'Apakah anda yakin ingin memperbarui data ini?'
                    : 'Apakah kamu yakin ingin menghapus data ini?'} */}
            Are you sure want to delete this data?
        </p>
        <div className="flex justify-center gap-8">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 cursor-pointer hover:dark:bg-gray-600 duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 duration-300 text-white cursor-pointer"
          >
            {/* {isEdit ? 'Update' : 'Hapus'} */}
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalKonfirmasi;
