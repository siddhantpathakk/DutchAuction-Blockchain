import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

function InfoPage() {
  const DemoPaper = styled(Paper)(({ theme }) => ({
    marginLeft: "10vw",
    width: "80vw",
    height: 600,
    padding: theme.spacing(2),
    ...theme.typography.body2,
  }));
  return (
    <div>
      <DemoPaper>
        <Typography variant="h3">Blockchain Project</Typography>
        <br />
        <Typography>
          {" "}
          This project implements a DutchAuction selling{" "}
          <strong>ERC20 coins</strong> To get started, clone this repo and open
          command shell in the root of the project.
        </Typography>
        <br />
        <Typography>
          First, get all the packages needed using{" "}
          <strong> `yarn install` or `npm install`</strong>
        </Typography>
        <Typography>
          <strong>Note:</strong> using yarn is recommended as npm may give
          errors while getting the dependency tree
        </Typography>
        <br />
        <Typography>
          Once all the packages have been added, you can use hardhat to run
          test:<br></br>
          <strong> `yarn hardhat test`</strong>
        </Typography>
        <Typography>
          The test include testing for re-entrancy attacks To start an auction
          and use the front-end, open a browser that has the metamask extension.
        </Typography>
        <Typography>
          <strong>Note:</strong> You will NOT be able to interact with hardhat
          if you do not have a metamask account.
        </Typography>
        <br />
        <Typography>
          Open another command shell and change directory to the front end from
          the root:
        </Typography>
        <Typography>
          <strong>`cd .\front-end\dutch-auction`</strong> Then start the react
          app with: <strong>`yarn start`</strong>
        </Typography>
        <br />
        <Typography>
          Next you need to start the Auction using the shell open in the root of
          the project: <strong>`yarn hardhat node`</strong>
        </Typography>
        <Typography>
          Ensure that your metamask is connected to the hardhat chain and import
          an account from hardhat to test the Auction. To do this, you can
          import using private key in metamask. The key will be displayed in the
          shell after running the command above.
        </Typography>
        <br />
        <Typography>
          You can find the link to the github repository at the top right of the
          page
        </Typography>
      </DemoPaper>
    </div>
  );
}

export default InfoPage;
