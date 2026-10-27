import DoctorCard from "./DoctorCard";

function DoctorList({doctor,onViewDetails}){

return(
    <>
    <div className="doctor-list">
        {doctor.map((item)=>
        <DoctorCard key={item.id} doctor={item} onViewDetails={onViewDetails}/>        
        
    
        )}
    </div>

    </>
)
}

export default DoctorList;