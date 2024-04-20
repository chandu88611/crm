import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { useDeleteAcademicsMutation, useUpdateStaffMutation } from '../../../../services/api';
import Swal from 'sweetalert2';
import axios from 'axios';
import { toast } from 'react-toastify';
const schema = Yup.object().shape({
  educations: Yup.array().of(
    Yup.object().shape({
      institute: Yup.string().required('Institute Name is required').min(3, 'Institute Name must be at least 3 characters').matches(/^[a-zA-Z. ]+$/, "Institute must contain only alphabets"),
      degree: Yup.string().required('Degree is required').min(3, 'Degree Name must be at least 3 characters').matches(/^[a-zA-Z. ]+$/, "Degree must contain only alphabets"),
      experienceYear: Yup.string().required('Start Year is required'),
      endExperienceYear: Yup.string().required('End Year is required').test('is-greater', 'End Year must be greater than Start Year', function (value) {
        const startYear = this.resolve(Yup.ref(`experienceYear`));
        return !startYear || !value || parseInt(value) > parseInt(startYear);
      }),
      zip: Yup
    .string()
    .required("Zip Code is required")
    .matches(/^[0-9]+$/, "Zip code must contain only digits").min(6, "Atleast 6 Digits").max(10, "Maximum 10 Digits")
    .test("no-space", "Enter Valid Zip Code ", (value) => {
      return value.trim().length > 0;
    }),
  state: Yup
    .string()
    .required("State is required")
    .matches(/^[a-zA-Z. ]+$/, "State must contain only alphabets")
    .test("no-space", "Enter Valid State", (value) => {
      return value.trim().length > 0;
    }),
  city: Yup
    .string()
    .required("City is required")
    .matches(/^[a-zA-Z. ]+$/, "City must contain only alphabets")
    .test("no-space", "Enter Valid City", (value) => {
      return value.trim().length > 0;
    }),
  country: Yup
    .string()
    .required("Country is required")
    .matches(/^[a-zA-Z. ]+$/, "Country must contain only alphabets")
    .test("no-space", "Enter Valid Country", (value) => {
      return value.trim().length > 0;
    }),
      address: Yup.string().required('Address is required'),
    })
  ),
});

 

const EducationalQualification = ({academic,refetch}) => {
    
  const { register, control, handleSubmit, formState: { errors },setValue,watch,trigger} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      educations:[{ institute: '', degree: '', experienceYear: '', endExperienceYear: '', city: '', state: '',id:'',zip:'',country:'',address:'' }],
    },
  });

  const zipcode1 = watch();
  console.log(zipcode1)
  const [deleteAcademics]=useDeleteAcademicsMutation()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educations',
  });

  useEffect(() => {
    if (academic && academic.length > 0) {
      const defaultValues = academic.map(item => ({
        institute: item.institute_name || '',
        degree: item.course || '',
        experienceYear: item.from_date || '',
        endExperienceYear: item.to_date || '',
        city: item.city || '',
        state: item.state || '',
        zip: item.zip || '',
        country: item.country || '',
        address: item.address || '',
        id: item.id || '',
      }));
      setValue('educations', defaultValues);
    }
  }, [academic, setValue]);
  const {id}=useParams()
      const [updateStaff,{loading:update}]=useUpdateStaffMutation()
      const onSubmit = async(data) => {
        console.log(data)
        const res=await  updateStaff({
            staff_id:id,
            academics:data?.educations?.map((acad)=>({
                id:acad?.id,
                institute_name:acad?.institute,
                course:acad.degree,
                from_date:acad.experienceYear,
                to_date:acad.endExperienceYear,
                city:acad.city,
                state:acad.state,
                country:acad.country,
                address:acad.address,
                zip:acad.zip,
            
            })),
            type:'academic'
        })
       
        if(res?.data?.status){
     
            Swal.fire({
             title: "Success",
             text: res?.data?.message,
             icon: "success"
           }).then((result) => {
             if (result.isConfirmed) {
             refetch()
             }
           })
          }{
            toast.error(res?.error?.data?.message)
          }
      };
   
      
      const fetchCSC = async (value, index) => {
        try {
          const response = await axios.post(
            "https://skycontroller.connetz.shop/tl-api/get-postal-code",
            { zip: value },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("clt_token")}`,
              },
            }
          );
          console.log(response?.data);
          if (response) {
            setValue(`educations.${index}.city`, response?.data?.data?.postal_data?.taluq);
            setValue(`educations.${index}.state`, response?.data?.data?.postal_data?.state);
            setValue(`educations.${index}.country`, response?.data?.data?.postal_data?.country);
          }
        } catch (err) {
          console.log(err);
        }
      };
      // useEffect(() => {
      //   if (zipcode1?.length == 6) {
      //     fetchCSC(zipcode1, "billing");
      //   }
      // }, [zipcode1]);
       // Debounce function implementation
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedFetchCSC = debounce(fetchCSC, 500); // 500ms debounce delay
  const[ zipCodeArray,setZipCodeArray] = useState([]);
  const zipcodes = watch(fields.map((_, index) => `educations.${index}.zip`));
 console.log(zipCodeArray)
 useEffect(() => {
  zipcodes.forEach((zipcode, index) => {
    console.log(zipcode,zipCodeArray[index]);
    if (zipcode && zipcode.length === 6 && zipcode !== zipCodeArray[index]) {
      setZipCodeArray(prevArray => {
        const newArray = [...prevArray];
        newArray[index] = zipcode;
        return newArray;
      });
      debouncedFetchCSC(zipcode, index);
    }
  });
}, [zipcodes]);




 
const handleAddNewForm = async () => {
  // Trigger validation for all fields
  const isValid = await trigger();

  if (!isValid) {
    toast.error("Please fill in all fields before adding a new form.");
    return;
  }

  // If all fields are filled, append a new form
  append({ institute: '', degree: '', experienceYear: '', endExperienceYear: '', city: '', state: '', id: '', zip: '', country: '', address: '' });
};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, index) => (
        <div key={item.id}>
          <div className="row">
            <div className="col-lg-12">
              <div className="mb-3">
                <label htmlFor={`institute${index}`} className="form-label">Institute Name</label>
                <input type="text" className="form-control" id={`institute${index}`} placeholder="Institute Name" {...register(`educations.${index}.institute`)} />
                <p className="text-danger">{errors?.educations?.[index]?.institute?.message}</p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="mb-3">
                <label htmlFor={`degree${index}`} className="form-label">Degree</label>
                <input type="text" className="form-control" id={`degree${index}`} placeholder="Degree" {...register(`educations.${index}.degree`)} />
                <p className="text-danger">{errors?.educations?.[index]?.degree?.message}</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="mb-3">
                <label htmlFor={`experienceYear${index}`} className="form-label">Start Year</label>
                <select type="date" className="form-control" id={`experienceYear${index}`} placeholder="Start Year" {...register(`educations.${index}.experienceYear`)} >
                <option value="">Select start Year</option>
                <option value="2001">2001</option>
                    <option value="2002">2002</option>
                    <option value="2003">2003</option>
                    <option value="2004">2004</option>
                    <option value="2005">2005</option>
                    <option value="2006">2006</option>
                    <option value="2007">2007</option>
                    <option value="2008">2008</option>
                    <option value="2009">2009</option>
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020" selected>
                      2020
                    </option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                </select>
                <p className="text-danger">{errors?.educations?.[index]?.experienceYear?.message}</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="mb-3">
                <label htmlFor={`endExperienceYear${index}`} className="form-label">End Year</label>
                <select type="date" className="form-control" id={`endExperienceYear${index}`} placeholder="End Year" {...register(`educations.${index}.endExperienceYear`)} >
                    <option value="">Select End Year</option>
                    <option value="2001">2001</option>
                    <option value="2002">2002</option>
                    <option value="2003">2003</option>
                    <option value="2004">2004</option>
                    <option value="2005">2005</option>
                    <option value="2006">2006</option>
                    <option value="2007">2007</option>
                    <option value="2008">2008</option>
                    <option value="2009">2009</option>
                    <option value="2010">2010</option>
                    <option value="2011">2011</option>
                    <option value="2012">2012</option>
                    <option value="2013">2013</option>
                    <option value="2014">2014</option>
                    <option value="2015">2015</option>
                    <option value="2016">2016</option>
                    <option value="2017">2017</option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                    <option value="2020" >
                      2020
                    </option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026" selected>2026</option>
                </select>
                <p className="text-danger">{errors?.educations?.[index]?.endExperienceYear?.message}</p>
              </div>
            </div>
            <div className="col-lg-3">
          <div className="mb-3">
            <label htmlFor="zipcodeInput" className="form-label">Zip Code</label>
            <input type="text" className="form-control" minLength="5" maxLength="6" id={`zip${index}`} placeholder="Enter zipcode" {...register(`educations.${index}.zip`)} />
            <p className="text-danger">{errors?.educations?.[index]?.zip?.message}</p>
          </div>
        </div>
            <div className="col-lg-3">
              <div className="mb-3">
                <label htmlFor={`city${index}`} className="form-label">City</label>
                <input type="text" className="form-control" id={`city${index}`} placeholder="City" {...register(`educations.${index}.city`)} />
                <p className="text-danger">{errors?.educations?.[index]?.city?.message}</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="mb-3">
                <label htmlFor={`state${index}`} className="form-label">State</label>
                <input type="text" className="form-control" id={`state${index}`} placeholder="State" {...register(`educations.${index}.state`)} />
                <p className="text-danger">{errors?.educations?.[index]?.state?.message}</p>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="mb-3">
                <label htmlFor={`state${index}`} className="form-label">Country</label>
                <input type="text" className="form-control" id={`country${index}`} placeholder="State" {...register(`educations.${index}.country`)} />
                <p className="text-danger">{errors?.educations?.[index]?.country?.message}</p>
              </div>
            </div>
        <div className="col-lg-12">
          <div className="mb-3 pb-2">
            <label htmlFor="exampleFormControlTextarea" className="form-label">Address</label>
            <textarea className="form-control" id={`address${index}`} placeholder="Enter your address" rows="3" {...register(`educations.${index}.address`)}  ></textarea>
            <p className="text-danger">{errors?.educations?.[index]?.address?.message}</p>
          </div>
        </div>
          {index>0&&  <div className="hstack gap-2 justify-content-end">
              <button type="button" className="btn btn-danger bg-danger" onClick={() => remove(index)}>Delete</button>
            </div>}
          </div>
        </div>
      ))}
      <div className="col-lg-12">
        <div className="hstack gap-2">
          <button type="submit" className="btn btn-primary bg-primary">Update</button>
          <button type="button" className="btn btn-secondary bg-secondary"   onClick={handleAddNewForm}>Add New</button>
        </div>
      </div>
    </form>
  );
};

export default EducationalQualification;
