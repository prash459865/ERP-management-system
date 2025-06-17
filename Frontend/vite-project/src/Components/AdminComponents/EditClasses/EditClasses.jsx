import React, { useCallback, useEffect ,useState} from 'react'
import './EditClasses.css'
import { useApi } from '../../../Contexts/ApiContext'
import ParticularClass from './ParticularClass/ParticularClass'
import axios from 'axios'
import AvailableTeachers from './AvailableTeachers/AvailableTeachers'

const EditClasses = () => {
    const { baseURL } = useApi();
    const userId = localStorage.getItem("userId")
    const [classes, setClasses] = useState([]);
    const [active,setActive] = useState('');
    const [nameAndSection,setnameAndSection] = useState('');
    console.log(classes,"from Edit Classes")
    console.log(active,"from Edit Classes")
    const [appointTeacher, setAppointTeacher] = useState({
      teacherName:'',
      teacherId:''
    })

    useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.post(`${baseURL}/AccessClasses`, { userId }, { withCredentials: true });
        setClasses(response.data.allClasses || []);
      } catch (error) {
        console.error("Error fetching classes", error);
      }
    };

    fetchClasses();
  }, [baseURL, userId]);

  //  console.log(classes)


    return (
        <div className='EditClasses'>
            <h1>All Classes</h1>
            <div className='AllClasses'>
               {classes.map((value,index)=>(
                    <div key={index} className={active === value ? 'particularClassAfterClick' : 'particularClass'} onClick={() => { setActive(value);setnameAndSection(`${value.name}${value.section}`)}}>
                        {value.name}
                        {value.section}
                    </div>
               ))}
            </div>
            <hr />
           <div className='Components'> 
             {active? <ParticularClass  nameAndSection={nameAndSection} appointTeacher={appointTeacher} setAppointTeacher={setAppointTeacher} data={active}/>:<div className='nothingtosee'><h3>Choose Class to view time table</h3></div>}
            <AvailableTeachers setAppointTeacher={setAppointTeacher}/>
           </div>
        </div>
    )
}

export default EditClasses
