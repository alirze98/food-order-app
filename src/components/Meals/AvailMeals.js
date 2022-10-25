import React,{useEffect, useState} from "react";
import MealsItem from "./MealsItem/MealsItem";
import classes from "./AvailMeals.module.css";
import Card from "../UI/Card";


const AvailMeals = () => {
  const [mealsItems,setMealsItems] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [error,setError] = useState(false)

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-project-87f5f-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok){
        throw new Error('Something went wrong!')
       }
       const objectedResponse = await response.json()
       const fetchMealsItems = []
       for(const key in objectedResponse){
        fetchMealsItems.push(objectedResponse[key])
       }
       setMealsItems(fetchMealsItems)
       setIsLoading(false)
    }
    
      fetchMeals().catch(error => {
        setError(error.message)
        setIsLoading(false)
      })
    
  },[])

  const availMealsContent = mealsItems.map((item, index) => {
    return (
      <MealsItem
        key={index}
        mealsName={item.name}
        mealsDesc={item.description}
        mealsPrice={item.price}
        mealsId={item.id}
      />
    );
  });
  return (
    <div className={classes.AvailMeals}>
      <Card>
        {error && <h3 className={classes.error}>{error}</h3>}
        {isLoading && <h3>loading...</h3>}
        <ul className={classes.mealsList}>{availMealsContent}</ul>
      </Card>
    </div>
  );
};

export default AvailMeals;
