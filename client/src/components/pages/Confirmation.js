import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ModuleContext from '../../context/module/moduleContext';
import AuthContext from '../../context/auth/authContext';
import LayoutContext from '../../context/layout/layoutContext';
import Sidebar from '../sidebar/Sidebar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const Confirmation = () => {
    const moduleContext = useContext(ModuleContext);
    const authContext = useContext(AuthContext);
    const layoutContext = useContext(LayoutContext);

    const { currentModules, confirmModules } = moduleContext;
    const { user } = authContext;
    const { closeSidebar, isSidebarOpen } = layoutContext;

    useEffect(() => {
        closeSidebar();
        // eslint-disable-next-line
    }, []);

    const [redirect, setRedirect] = useState(false);

    const onConfirm = () => {
        confirmModules(user._id);
        console.log('modules confirmed');
        setRedirect(true);
    };

    // disable cart the moment u enter this page

    return redirect ? (
        <Redirect to='/confirmed' />
    ) : (
        <Fragment>
            <Sidebar />
            <div className={isSidebarOpen ? 'main-shift' : 'main'}>
                <h2>Review Selection:</h2>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Rank</TableCell>
                                <TableCell>Module Name (Module Code)</TableCell>
                                <TableCell>Class Number</TableCell>
                                <TableCell>Lesson Information</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentModules.map((module, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{`${module.title} (${module.moduleCode})`}</TableCell>
                                    <TableCell>{module.classNo}</TableCell>
                                    <TableCell>
                                        {module.timing.map(
                                            (timeslot, index) => (
                                                <div key={index}>
                                                    {`${timeslot.venue}, ${timeslot.day} ${timeslot.startTime} - ${timeslot.endTime}`}
                                                </div>
                                            )
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <br />
                <button className='btn btn-primary' onClick={onConfirm}>
                    Confirm Modules
                </button>{' '}
                <br />
                <br />
                <Link to='/' className='btn btn-light'>
                    Go back
                </Link>
            </div>
        </Fragment>
    );
};

export default Confirmation;
