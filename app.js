'use strict';

// Make a resuable checklist component
class CheckList extends React.Component {
  render() {
    
    const ListItems = this.props.options.map((textValue, index) =>
      <span className={ this.props.errors.indexOf(this.props.section) > -1 ? "checkitem error" : "checkitem" } key={textValue}>      
        <input
          value={textValue}
          data-section={this.props.section}
          id={"checkbox-" + this.props.section + "-" + index}
          name={this.props.section}
          type="radio"
          onChange={this.props.onChange}
          checked={ this.props.selected === textValue ? 'checked' : '' }
        ></input>
        <label htmlFor={"checkbox-" + this.props.section + "-" + index}>{textValue}</label>
        <br />
      </span>
    );
    
    return (
      <div>
        { ListItems }
      </div>
    );
  }  
}

// The main form
class NameForm extends React.Component {
  
  // All my variables and data stores
  constructor(props) {
    super(props);
    this.state = {
      textValue: '',
      check: false,
      rating: [
        'Energy',
        'Water',
        'Waste',
        'Indoor environment',
      ],
      building: [
        'Office',
        'Hotel',
        'Shopping centre',
        'Data centre',
      ],
      office: [
        'Base building',
        'Whole building',
        'Tenancy',
      ],
      data: [
        'IT equipment',
        'Whole facility',
        'Infrastructure',
      ],
      errors: [],
      ratingSelected: '',
      buildingSelected: '',
      officeSelected: '',
      dataSelected: '',
      postcode: '',
      currentPage: 'one',
      floorSpace: '',
      occupiedHours: '',
      showMore: false,
      formIsValid: true,
    };

    // Bind all functions to This
    this.handleChange     = this.handleChange.bind(this);
    this.handleNavigation = this.handleNavigation.bind(this);
    this.toggleMore       = this.toggleMore.bind(this);
  }

  // Global field change handler
  handleChange(event) {
    
    // If a Rating checkbox was triggered, what should the building array contain?
    if (event.target.getAttribute('data-section') === 'rating') {
      if (event.target.value === 'Energy') {
        this.setState({building: [
          'Office',
          'Hotel',
          'Shopping centre',
          'Data centre',
        ]});
      }
      if (event.target.value === 'Water') {
        this.setState({building: [
          'Office',
          'Hotel',
          'Shopping centre',
        ]});
      }
      if (event.target.value === 'Waste') {
        this.setState({building: [
          'Office',
        ]});
      }
      if (event.target.value === 'Indoor environment') {
        this.setState({building: [
          'Office',
        ]});
      }
      
      // And which Rating was selected
      this.setState({ ratingSelected: event.target.value });
    }
    
    if (event.target.getAttribute('data-section') === 'building') {
      this.setState({ buildingSelected: event.target.value });
    }
    
    if (event.target.getAttribute('data-section') === 'office') {
      this.setState({ officeSelected: event.target.value });
    }
    
    if (event.target.getAttribute('data-section') === 'data') {
      this.setState({ dataSelected: event.target.value });
    }
    
    // The following should be rewritten as they all follow the same format
    if (event.target.name === 'postcode') {
      this.setState({postcode: event.target.value});
    }
    
    if (event.target.name === 'floorSpace') {
      this.setState({floorSpace: event.target.value});
    }
    
    if (event.target.name === 'occupiedHours') {
      this.setState({occupiedHours: event.target.value});
    }
    
    if (event.target.name === 'kWHours') {
      this.setState({kWHours: event.target.value});
    }
    
    if (event.target.name === 'greenPerc') {
      this.setState({greenPerc: event.target.value});
    }
    
    if (event.target.name === 'totalWater') {
      this.setState({totalWater: event.target.value});
    }
    
    if (event.target.name === 'waterPerc') {
      this.setState({waterPerc: event.target.value});
    }
    
  } 

  // Handling navigation and form validation
  handleNavigation(event) {
    
    let formIsValid = true;
    let newErrors = [];
    
    
    // Ensure all fields on Page 1 are filled as required
    if (this.state.currentPage === 'one') {
      
      if (this.state.ratingSelected === '') {
        formIsValid = false;
        newErrors.push("rating");   
      }
      
      if (this.state.buildingSelected === '') {
        formIsValid = false;
        newErrors.push("building");   
      }
      
      // Set Errors
      this.setState({ errors: newErrors })
      
    }
    
    // If form has an error we don't change the page
    if (formIsValid) {
      this.setState({currentPage: event.target.name});
    }
    
    event.preventDefault();
  }
  
  // Toggle the 'More Detail' section
  toggleMore(event) {
    this.setState(prevState => ({
      showMore: !prevState.showMore
    }));
    event.preventDefault();
  }

  render() {
    return (
      <form>
        
        { this.state.currentPage === 'one' && 
          <div id="page1">          
          
            <h1>Rating details</h1>
            
            <h2>What type of rating would you like to estimate?</h2>
            <CheckList
              errors={this.state.errors}
              selected={this.state.ratingSelected}
              section="rating"
              options={this.state.rating}
              onChange={this.handleChange}
            />
            
            <hr />
            
            <h2>What type of building?</h2>
            <CheckList
              errors={this.state.errors}
              selected={this.state.buildingSelected}
              section="building"
              options={this.state.building}
              onChange={this.handleChange}
            />
            
            <hr />
            
            { this.state.buildingSelected === 'Office' && 
              <div>
                <h2>What is the scope of your rating?</h2>
                <CheckList
                  errors={this.state.errors}
                  selected={this.state.officeSelected}
                  section="office"
                  options={this.state.office}
                  onChange={this.handleChange}
                />
                <hr />
              </div>
            }
            
            { this.state.buildingSelected === 'Data centre' && 
              <div>
                <h2>What is the scope of your rating?</h2>
                <CheckList
                  errors={this.state.errors}
                  selected={this.state.dataSelected}
                  section="data"
                  options={this.state.data}
                  onChange={this.handleChange}
                />
                <hr />
              </div>
            }
            
            <h2>What is the postcode of the building?</h2>
            <input
              name="postcode"
              type="number"
              min="0"
              max="9999"
              value={this.state.postcode}
              onChange={this.handleChange}
            />
            
            <hr />
            
            <input
              name="two"
              type="submit"
              value="Next"
              onClick={this.handleNavigation}
            />
          </div>
        }
        
        { this.state.currentPage === 'two' && 
          <div id="page2">
          
            <h1>Building details</h1>
          
            <h2>What is the floor space of the building?</h2>
            <input
              name="floorSpace"
              type="text"
              value={this.state.floorSpace}
              onChange={this.handleChange}
            /> m<sup>2</sup>
            
            <hr />
            
            <h2>How many hours per week is the building occupied?</h2>
            <input
              name="occupiedHours"
              type="text"
              value={this.state.occupiedHours}
              onChange={this.handleChange}
            /> hours
            
            <hr />
            
            { this.state.ratingSelected === 'Energy' && 
              <div id="energy">
                <h1>Energy use</h1>
                
                <h2>Total electricity use for 12 months</h2>
                <input
                  name="kWHours"
                  type="text"
                  value={this.state.kWHours}
                  onChange={this.handleChange}
                /> kWh
                
                <hr />
                
                <h2>What percentage of the total electricity use is GreenPower?</h2>
                <input
                  name="greenPerc"
                  type="text"
                  value={this.state.greenPerc}
                  onChange={this.handleChange}
                /> %
                
                <hr />
              </div>
            }
            
            { this.state.ratingSelected === 'Water' && 
              <div id="water">
                <h1>Water use</h1>
                
                <h2>Total water consumption for 12 months</h2>
                <input
                  name="totalWater"
                  type="text"
                  value={this.state.totalWater}
                  onChange={this.handleChange}
                /> kl
                
                <hr />
                
                <h2>What percentage of the total water consumption is externally supplied recycled water?</h2>
                <input
                  name="waterPerc"
                  type="text"
                  value={this.state.waterPerc}
                  onChange={this.handleChange}
                /> %
                
                <hr />
              </div>
            }
            
            <input
              name="one"
              type="submit"
              value="Back"
              onClick={this.handleNavigation}
            />
            
            <input
              name="three"
              type="submit"
              value="Next"
              onClick={this.handleNavigation}
            />
          
          </div>
        
        }
        
        { this.state.currentPage === 'three' && 
          <div id="page3">
          
            { this.state.ratingSelected === 'Energy' && 
              <div id="energyResult">
                <h1>Your estimated Energy rating is x star with GreenPower</h1>
                <p>The energy intensity of the building is x MJ/m2.</p>
                <p>Your estimated rating without GreenPower is x star.</p>
                <hr />
                { !this.state.showMore && 
                  <button onClick={this.toggleMore}>More Detail</button>
                }
                { this.state.showMore && 
                  <div id="moreDetail">
                    <div>
                      <div>{this.state.greenPerc} % GreenPower</div>
                    </div>
                    <div>
                       <div>{this.state.kWHours} kg CO2-e p.a. Total greenhouse gas emissions, scope 1 and 2 with GreenPower</div>
                    </div>
                    <button onClick={this.toggleMore}>Less Detail</button>
                  </div>
                }
              </div>
            }
            
            { this.state.ratingSelected === 'Water' && 
              <div id="waterResult">
                <h1>Your estimated Water rating is x star with recycled water</h1>
                <hr />
                <p>The normalised water consumption of the base building is {this.state.totalWater} kL/m2 p.a.</p>
                <p>Your estimated rating without recycled water is x star.</p>
                { !this.state.showMore && 
                  <button onClick={this.toggleMore}>More Detail</button>
                }
                { this.state.showMore && 
                  <div id="moreDetail">
                    <div>
                      <div>{this.state.waterPerc} % Recycled water</div>
                    </div>
                    <div>
                       <div>{this.state.totalWater} kL p.a. Total water consumption with recycled water</div>
                    </div>
                    <button onClick={this.toggleMore}>Less Detail</button>
                  </div>
                }
              </div>
            }
            
            <br />
            
            <input
              name="two"
              type="submit"
              value="Back"
              onClick={this.handleNavigation}
            />
            
          </div>
        }
        
      </form>
    );
  }
}

// Render our Form Component into our #myreactapp DOM element
const e = React.createElement;
const domContainer = document.querySelector('#myreactapp');
ReactDOM.render(e(NameForm), domContainer);