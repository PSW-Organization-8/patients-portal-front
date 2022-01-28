// Constant application variables
import { environment} from "src/environments/environment";

export const serverPort = environment.apiHost;

export const doctorSpecializations = [{
    name: "FamilyPhysician",
    value: 0
  },
  {
    name: "Surgeon",
    value: 1
  },
  {
    name: "Internist",
    value: 2
  },
  {
    name: "Dermatologist",
    value: 3
  }, 
  {
    name: "Cardiologist",
    value: 4
  }, 
  {
    name: "Otorhinolaryngologist",
    value: 5
  }, 
  {
    name: "Urologist",
    value: 6
  },
  {
    name: "Gynecologist",
    value: 7
  },
  {
    name: "Neurologist",
    value: 8
  }
]    
