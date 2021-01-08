import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Route, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Home from '@material-ui/icons/Home';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchBox from './SearchBox';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 0,
  },
  title: {
    display: 'none',
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  home: {
    display: 'block',
    marginRight: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Header({
  cartItems,
  userInfo,
  setSidebarIsOpen,
  signoutHandler
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Link to="/productlist/seller">Produits</Link></MenuItem>
      <MenuItem onClick={handleMenuClose}><Link to="/orderlist/seller">Commandes</Link></MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {userInfo ? (
      <>
        <MenuItem>
          <NotificationsIcon />
          <Link to="/orderhistory">Historique de commande</Link>
        </MenuItem>
        <MenuItem onClick={handleProfileMenuOpen}>
          <Link to="/profile">Profil</Link>
        </MenuItem>
        
        {userInfo.isSeller && <><MenuItem onClick={handleMenuClose}>
            <Link to="/productlist/seller">Produits de Vendeur</Link>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Link to="/orderlist/seller">Commandes de Vendeur</Link>
        </MenuItem></>}

        {userInfo.isAdmin && <>
          <MenuItem onClick={handleProfileMenuOpen}>
            <Link to="/dashboard">Dashboard</Link>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <Link to="/productlist">Produits</Link>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <Link to="/orderlist">Commandes</Link>
          </MenuItem>
          <MenuItem onClick={handleProfileMenuOpen}>
            <Link to="/userlist">Utilisateurs</Link>
          </MenuItem>
      </>}

      <MenuItem onClick={handleProfileMenuOpen}>
        <Link to="#signout" onClick={signoutHandler}>
            Déconnexion
        </Link>
      </MenuItem>
      </>
      ) : (
        <MenuItem onClick={handleProfileMenuOpen}>
        <Link to="/signin">Connexion</Link>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => setSidebarIsOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Gâteau Tunisien
          </Typography>
          <Link to="/" className={classes.home}>
              <Badge badgeContent={cartItems.length} color="secondary">
                  <Home />
              </Badge>
            </Link>
          <Route
            render={({ history }) => (
              <SearchBox history={history}></SearchBox>
            )}
          ></Route>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to="/cart">
                Panier
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
            </Link>
            {userInfo ? (
              <>
              <Link to="/profile">Profil</Link>
              <Link to="/orderhistory">Historique de commande</Link>
              {userInfo.isSeller && <Button
                href="#admin"
                style={{ fontSize: "inherit", fontFamilly: "inherit", textTransform: "inherit" }}
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                Vendeur
              </Button>}

              {userInfo.isAdmin && <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/productlist">Produits</Link>
                <Link to="/orderlist">Commandes</Link>
                <Link to="/userlist">Utilisateurs</Link>
              </>}

              <Link to="#signout" onClick={signoutHandler}>
                Déconnexion
              </Link>
              </>
              ) : (
                <Link to="/signin">Connexion</Link>
              )}
            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </div>
          <div className={classes.sectionMobile}>
            <Link to="/cart">
              <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCartIcon />
              </Badge>
            </Link>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
