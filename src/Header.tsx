import React, { useState } from 'react'
import { AppBar } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Button, Typography } from '@material-ui/core'
import grey from '@material-ui/core/colors/grey'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { UserInfoState } from './Slice/UserInfo'
import { Menu, MenuItem } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bar: {
      background: grey[400],
      zIndex: theme.zIndex.drawer + 1,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: theme.spacing(1),
    },
    typo: {
      fontSize: 23,
    },
    account: {},
    link: {
      color: 'black',
      textDecoration: 'none',
    },
  })
)

const Header: React.FC = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<Element>()
  const userName = useSelector<
    UserInfoState,
    UserInfoState['UserInfo']['UserName']
  >((state) => {
    console.log('state:', state)
    console.log('useInfo:', state.UserInfo)
    return state.UserInfo.UserName
  })
  return (
    <AppBar position="fixed" className={classes.bar}>
      <Typography align="center" className={classes.typo}>
        TASK CHECKER
      </Typography>
      <Button
        variant="contained"
        color="default"
        className={classes.account}
        startIcon={<AccountCircleIcon />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {userName}
      </Button>
      <Menu
        id="accountMenu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(undefined)}
      >
        <MenuItem onClick={() => localStorage.removeItem('task_checker_token')}>
          <Link className={classes.link} to="/login">
            Logout
          </Link>
        </MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Header
