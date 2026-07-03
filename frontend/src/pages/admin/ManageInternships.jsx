import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import InternshipTable from "../../components/admin/InternshipTable";
import InternshipForm from "../../components/admin/InternshipForm";
import InternshipFilters from "../../components/filters/InternshipFilters";
import { getAllInternships, createInternship, updateInternship, deleteInternship, filterInternships } from "../../services/adminInternshipService";
import { PlusCircle, Briefcase } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmModal from "../../components/common/ConfirmModal";
import SkeletonTable from "../../components/skeletons/SkeletonTable";

function ManageInternships() {
    const [internships, setInternships] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [internshipToDelete, setInternshipToDelete] = useState(null);

    useEffect(() => {
        loadInternships();
    }, []);

    async function loadInternships() {
        try {
            setLoading(true);
            const response = await getAllInternships();
            setInternships(response.data);
        } catch (error) {
            console.error("Failed to load admin internships", error);
        } finally {
            setLoading(false);
        }
    }

    async function searchInternships(filters) {
        try {
            setLoading(true);
            if (Object.keys(filters).length === 0) {
                await loadInternships();
                return;
            }
            const response = await filterInternships(filters);
            setInternships(response.data);
        } catch (error) {
            console.error("Failed to filter internships", error);
        } finally {
            setLoading(false);
        }
    }

    function addInternship() {
        setSelectedInternship(null);
        setShowForm(true);
    }

    function editInternship(internship) {
        setSelectedInternship(internship);
        setShowForm(true);
    }

    async function saveInternship(data) {
        try {
            if (selectedInternship) {
                await updateInternship(selectedInternship.id, data);
                toast.success("Internship updated successfully!");
            } else {
                await createInternship(data);
                toast.success("Internship created successfully!");
            }
            setShowForm(false);
            setSelectedInternship(null);
            loadInternships();
        } catch (error) {
            console.error("Failed to save internship data", error);
            toast.error("Failed to save internship.");
        }
    }

    function removeInternship(id) {
    setInternshipToDelete(id);
    setShowDeleteModal(true);
}

async function confirmDeleteInternship() {

    try {

        await deleteInternship(internshipToDelete);

        toast.success("Internship deleted successfully.");

        loadInternships();

    } catch (error) {

        console.error(error);

        toast.error("Unable to delete internship.");

    } finally {

        setShowDeleteModal(false);

        setInternshipToDelete(null);

    }

}

    return (
        <AdminLayout>
            <div className="space-y-4">
                {/* Header Title Row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                            <Briefcase size={18} className="text-slate-700" />
                            <span>Manage Internships</span>
                        </h1>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Create, update, or archive active internship opportunities
                        </p>
                    </div>
                    {!showForm && (
                        <button
                            onClick={addInternship}
                            className="btn-primary py-1.5 px-3 text-xs w-fit inline-flex items-center gap-1.5"
                        >
                            <PlusCircle size={13} />
                            <span>Create Posting</span>
                        </button>
                    )}
                </div>

                {/* Form Overlay */}
                {showForm && (
                    <InternshipForm
                        internship={selectedInternship}
                        onSave={saveInternship}
                        onCancel={() => {
                            setShowForm(false);
                            setSelectedInternship(null);
                        }}
                    />
                )}

                {/* Filters */}
                <InternshipFilters onSearch={searchInternships} />

                {/* Database Table */}
                {loading ? (
    <SkeletonTable />
) : (
    <InternshipTable
        internships={internships}
        onEdit={editInternship}
        onDelete={removeInternship}
    />
)}
            </div>

            <ConfirmModal
    open={showDeleteModal}
    title="Delete Internship"
    message="Are you sure you want to permanently delete this internship? This action cannot be undone."
    confirmText="Delete"
    cancelText="Cancel"
    danger={true}
    onConfirm={confirmDeleteInternship}
    onCancel={() => {
        setShowDeleteModal(false);
        setInternshipToDelete(null);
    }}
/>
        </AdminLayout>
    );
}

export default ManageInternships;