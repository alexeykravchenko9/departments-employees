import React, { Component } from 'react';

// Containers
import TopBar from '../TopBar/index.jsx';
import TableEmployees from '../TableEmployees/index.jsx';

class Main extends Component {

    render(){

        return (

                <section >

                    <TopBar />

                    <TableEmployees />

                </section>
        )
    }
}

export default Main;