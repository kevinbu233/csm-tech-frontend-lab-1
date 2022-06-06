import React from 'react';
import get from "../utils/api";
// import courses from "../data/courses";
// import resources from "../data/resources";

class Resources extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeID: 1
        };
    }

    handleClick(i) {
        this.setState({
            activeID: i
        })
    }

    render() {
        return (
            <div>
                <Navbar courseID = {this.state.activeID} course = {get("/courses")} onClick = {(i) => this.handleClick(i)}/>
                <Table courseID = {this.state.activeID} resource = {get(`/resources/${this.state.activeID}/resources`)}/>
             </div>
            
        )
    }
}

class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let tabs = this.props.course.map((row) => {
            return <button id = {row.id} onClick = {() => this.props.onClick(row.id)}>{row.name}</button>
        })
        return (
            <div className = "navbar">
                {tabs}
            </div>
        )
    }
}

// function tab(props) {
//     return (
//       <button className="square" onClick={props.onClick}>
//         {props.value}
//       </button>
//     );
//   }

class Table extends React.Component {
    constructor(props) {
        super(props)
        
    }

    render() {
        const rows = this.props.resource.map((row) =>{
            return <Row info = {row} />
        })
        return (<div className = "content"> 
        <div>Week</div><div>Topics</div><div>Worksheet</div><div>Solutions</div>
            {rows}
        </div>)
    }
}

function Row(props) {
    const infos = Object.entries(props.info)
    return (infos.map((value) =>{
        if (value[0] === "date" | value[0] === "topics" | value[0] === "worksheet")
        return <div className = "row">{value[1]}</div>
        if (value[0] === "weekNum")
        return <div className = "row">Week {value[1]}</div>
    }))
}

export default Resources;