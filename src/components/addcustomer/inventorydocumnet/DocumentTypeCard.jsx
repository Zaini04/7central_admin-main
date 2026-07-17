import { useState } from "react";
import { useDispatch } from "react-redux";
import Axios from "config/api";
import toast from "react-hot-toast";
import { DOCUMENT_TYPE_MAP } from "constants/app.constants";
import { create_InstallmentPlan } from "redux/actions/customerActions";
import NextButton from "components/global/form/NextButton";
import { uploadAttachment } from "utils/uploadAttachment";
import AttachmentCaptureCompact from "./AttachementCapture";

const DocumentTypeCard = ({ typeLabel, inventoryId, existingDoc, queryClient }) => {
  const dispatch = useDispatch();

  const [attachment, setAttachment] = useState(
    existingDoc?.attachments?.[0] || null // {fileUrl} - already saved on server
  );
  const [pendingFile, setPendingFile] = useState(null); // {base64, fileName, fileType} - freshly picked, not uploaded yet
  const [saving, setSaving] = useState(false);

  const isUploaded = !!attachment;

  const handleFileSelect = (field, val) => {
    setPendingFile(val);
  };

  const handleSave = async () => {
  if (!pendingFile && !attachment) {
    toast.error("Please select a file first");
    return;
  }
  setSaving(true);
  try {
    let finalAttachments = [];

    if (pendingFile) {
      // pehle jaisa hi tareeqa — base64 string hi fileUrl hai, koi upload API nahi
      finalAttachments = [{ fileUrl: pendingFile.base64 }];
    } else if (attachment?.fileUrl) {
      finalAttachments = [attachment];
    }

    const payload = {
      name: typeLabel,
      type: DOCUMENT_TYPE_MAP[typeLabel] || typeLabel,
      inventory: inventoryId,
      ...(finalAttachments.length > 0 ? { attachments: finalAttachments } : {}),
      ...(existingDoc?._id && { documentId: existingDoc._id }),
    };

    await dispatch(create_InstallmentPlan(payload));
    queryClient.invalidateQueries(["InventoryDocumnet"]);
    queryClient.invalidateQueries(["fetch-content-details"]);

    setAttachment(finalAttachments[0] || null);
    setPendingFile(null);
    // toast.success(`${typeLabel} saved`);
  } catch (err) {
    console.error("Error saving document:", err);
    toast.error(`Failed to save ${typeLabel}`);
  } finally {
    setSaving(false);
  }
};

  const handleDelete = async () => {
    if (!existingDoc?._id) return;
    try {
      await Axios.delete(`/document/${existingDoc._id}`);
      queryClient.invalidateQueries(["InventoryDocumnet"]);
      setAttachment(null);
      toast.success(`${typeLabel} removed`);
    } catch (err) {
      console.error("Error deleting document:", err);
      toast.error(`Failed to delete ${typeLabel}`);
    }
  };

  return (
    <div className="w-full bg-light2  border-b-2 px-4 py-3 flex justify-between items-center gap-3 flex-wrap">
      {/* Type name */}
      <div className="flex items-center gap-5">
      <p className="text-sm font-semibold text-primary min-w-[130px]">
        {typeLabel}
      </p>

      {/* Status */}
      <span
        className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${
          isUploaded
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {isUploaded ? "Uploaded" : "Not Uploaded"}
      </span>

      {/* Upload / Change control */}
      <div className="shrink-0">
  <AttachmentCaptureCompact
    name="attachment"
    value={pendingFile}
    onChange={handleFileSelect}
  />
</div>
</div>

      {/* Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {isUploaded && (
          <button
            type="button"
            onClick={handleDelete}
            className="text-xs text-red-500 px-3 py-1.5 rounded-full border border-red-200 hover:bg-red-50"
          >
            Delete
          </button>
        )}
        <button type="button" onClick={handleSave} disabled={saving}>
          <NextButton
            label={saving ? "Saving..." : "Save"}
            isIcon={false}
            createLoading={saving}
          />
        </button>
      </div>
    </div>
  );
};

export default DocumentTypeCard;