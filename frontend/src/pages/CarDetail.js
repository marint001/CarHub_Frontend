// Add this in the CarDetail component, near the action buttons
import { FaBalanceScale } from 'react-icons/fa';

// Add state for comparison
const [isInComparison, setIsInComparison] = useState(false);

// Add function to handle compare
const handleAddToCompare = () => {
    // Get existing comparison from localStorage
    const comparison = JSON.parse(localStorage.getItem('carComparison') || '[]');
    
    if (isInComparison) {
        // Remove from comparison
        const newComparison = comparison.filter(id => id !== car.id);
        localStorage.setItem('carComparison', JSON.stringify(newComparison));
        setIsInComparison(false);
    } else {
        // Add to comparison
        if (comparison.length < 4) {
            comparison.push(car.id);
            localStorage.setItem('carComparison', JSON.stringify(comparison));
            setIsInComparison(true);
            
            // Show toast notification
            alert('Car added to comparison. Go to Compare page to view.');
        } else {
            alert('You can compare up to 4 cars at a time.');
        }
    }
};

// Add button in the action section
<div className="d-grid gap-2 mt-4">
    <div className="d-flex gap-2">
        <button className="btn btn-primary flex-grow-1" onClick={handleBookTestDrive}>
            Schedule Test Drive
        </button>
        <button 
            className={`btn ${isInComparison ? 'btn-success' : 'btn-outline-primary'}`}
            onClick={handleAddToCompare}
            title="Add to comparison"
        >
            <FaBalanceScale />
        </button>
    </div>
    <Link to="/cars" className="btn btn-outline-secondary">
        Back to Cars
    </Link>
</div>