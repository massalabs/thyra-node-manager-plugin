import React from 'react';
import {
  Button,
  TextField,
  CircularProgress,
  Typography,
  Container,
  Link,
} from '@mui/material';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { apiPost, localApiPost } from '../request';
import Node from '../types/Node';

interface Props {
  fetchNodes: () => void;
  selectedNode: Node | undefined;
  isUpdating: boolean;
  switchIsUpdating: () => void;
}

const Install: React.FC<Props> = (props: Props) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [name, setName] = React.useState('');
  const [host, setHost] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUser] = React.useState('');
  const [discordId, setDiscord] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const installNode = () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append('id', name);
    formData.append('host', host);
    formData.append('username', username);
    formData.append('wallet-password', password);
    formData.append('discord-id', discordId);
    formData.append('file', selectedFile);
    localApiPost(
      props.isUpdating ? `install?update=` + props.selectedNode?.Id : `install`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
      .then((response) => {
        setIsLoading(false);
        if (props.isUpdating) props.switchIsUpdating();
        console.log("Updated node")
        props.fetchNodes();
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleFileSelect = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const file = fileInputRef.current.files[0];
      setSelectedFile(file);
    }
  };

  function handleClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <Container
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px)',
        justifyContent: 'center',
      }}
    >
      <TextField
        required
        sx={{ marginTop: '8px' }}
        label="Node Name"
        id="name"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        required
        sx={{ marginTop: '8px' }}
        label="Host IP"
        id="host"
        onChange={(e) => setHost(e.target.value)}
        defaultValue={props.selectedNode?.Host}
      />
      <TextField
        required
        sx={{ marginTop: '8px' }}
        label="Wallet password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        defaultValue={props.selectedNode?.WalletPassword}
      />
      <TextField
        required
        sx={{ marginTop: '8px' }}
        label="SSH user"
        id="username"
        onChange={(e) => setUser(e.target.value)}
        defaultValue={props.selectedNode?.Username}
      />
      <TextField
        sx={{ marginTop: '8px' }}
        label="Discord token"
        id="discordId"
        onChange={(e) => setDiscord(e.target.value)}
        defaultValue={props.selectedNode?.DiscordId}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        sx={{
          padding: '16px 24px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          textTransform: 'none',
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#1976d2',
            borderColor: '#1976d2',
          },
          marginTop: '16px',
        }}
        startIcon={<CloudUploadIcon />}
      >
        {selectedFile ? selectedFile.name : 'Select SSH private key file'}
        <input
          type="file"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={installNode}
        sx={{
          borderRadius: 8,
          width: { xs: '100%', sm: '100%', md: '450px', lg: '550px' },
          height: '96px',
          marginTop: '16px',
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} />
        ) : (
          <Typography variant="h6">Setup your node</Typography>
        )}
      </Button>

      <Typography variant="overline">
        By clicking the button above, you will install a node on your server.
      </Typography>

      <Typography variant="h5" sx={{ mt: 4 }}>
        Install and manage your node in 1-click,
      </Typography>
      <Typography variant="h5">
        You simply need a VPS{' '}
        <Link
          underline="hover"
          href="https://github.com/massalabs/thyra-node-manager-plugin/wiki/Get-your-VPS"
        >
          <b>click here</b>
        </Link>{' '}
        and you can start
      </Typography>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Don't wait, become an actor of the decentralisation <b>now! </b>
      </Typography>
    </Container>
  );
};

export default Install;
