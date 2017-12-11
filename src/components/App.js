import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addRecipe, removeFromCalendar } from '../actions'
import { capitalize } from '../utils/helpers'
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o'
//import Modal from 'react-modal'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right'
//import Loading from 'react-loading'

class App extends Component {
  render() {
    const { calendar, remove } = this.props
    const mealOrder = ['breakfast', 'lunch', 'dinner']

    return (
      <div className='container'>

        <ul className='meal-types'>
          {mealOrder.map((mealType) => (
            <li key={mealType} className='subheader'>
              {capitalize(mealType)}
            </li>
          ))}
        </ul>

        <div className="icon-grid">
          { calendar.map(({ day, meals }) => (
            <ul key={day}>
              {mealOrder.map((meal) => (
                <li key={meal} className='meal'>
                  {meals[meal]
                    ? <div className='food-item'>
                        <img src={meals[meal].image} alt={meals[meal].label}/>
                        <button onClick={() => remove({meal, day})}>Clear</button>
                      </div>
                      : <button className='icon-btn'>
                        <CalendarIcon size={30}/>
                      </button>}
              </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ food, calendar}) {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  return {
    calendar: dayOrder.map( (day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal] ? food[day][meal] : null

      return meals
      }, {})
    }))
  }
}

export default connect(mapStateToProps)(App);
