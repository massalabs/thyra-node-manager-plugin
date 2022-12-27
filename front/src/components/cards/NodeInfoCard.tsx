import React from "react";

import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Skeleton,
    Tooltip,
    Typography,
} from "@mui/material";
import { HelpOutline } from "@mui/icons-material";

import Node from "../../types/Node";
import NodeStatus from "../../types/NodeStatus";
import NodeState from "../../types/NodeState";

import AddressDiplay from "../AddressDisplay";

interface Props {
    selectedNode: Node;
    nodeStatus:
        | { status: NodeStatus | undefined; state: NodeState }
        | undefined;
}

const NodeInfoCard: React.FC<Props> = (props: Props) => {
    return (
        <React.Fragment>
            <Typography variant="subtitle2" sx={{ ml: 2, mt: 1 }}>
                Basic info
            </Typography>
            <Card
                sx={{
                    height: "256px",
                    borderRadius: 4,
                    overflow: "auto",
                }}
            >
                <CardHeader
                    sx={{
                        pb: 0,
                    }}
                    title={
                        <Box
                            sx={{
                                display: "flex",
                            }}
                        >
                            <Typography variant="h6">Node name:</Typography>
                            <Typography
                                variant="h5"
                                sx={{ ml: 2, fontWeight: "bold" }}
                            >
                                {props.selectedNode.nodeName}
                            </Typography>
                        </Box>
                    }
                />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6}>
                            <Typography variant="subtitle2">
                                Node info
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Typography variant="h6" width="50%">
                                    Node IP:
                                </Typography>
                                <Typography variant="h6">
                                    {props.selectedNode.ip}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Typography variant="h6" width="50%">
                                    Node ID:
                                </Typography>
                                {props.nodeStatus?.status ? (
                                    <AddressDiplay
                                        address={
                                            props.nodeStatus?.status?.node_id
                                        }
                                    />
                                ) : (
                                    <Skeleton />
                                )}
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Typography variant="h6" width="50%">
                                    Node Version:
                                </Typography>
                                <Typography variant="h6">
                                    {props.nodeStatus?.status?.version ?? (
                                        <Skeleton />
                                    )}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            <Typography variant="subtitle2">
                                Massa info
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Typography variant="h6" width="50%">
                                    Current Cycle:
                                </Typography>
                                <Typography variant="h6">
                                    {props.nodeStatus?.status
                                        ?.current_cycle ?? <Skeleton />}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Typography variant="h6" width="50%">
                                    Current Period:
                                </Typography>
                                <Typography variant="h6">
                                    {props.nodeStatus?.status?.execution_stats
                                        .active_cursor.period ?? <Skeleton />}
                                    <Tooltip title="The period is the time between two slots of a same thread. It is approximately 16 seconds.">
                                        <IconButton sx={{ p: 0, ml: 1 }}>
                                            <HelpOutline fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Typography variant="h6" width="50%">
                                    Current Thread:
                                </Typography>
                                <Typography variant="h6">
                                    {props.nodeStatus?.status?.execution_stats
                                        .active_cursor.thread ?? <Skeleton />}
                                    <Tooltip title="The Massa blockchain is divided in 32 Threads that are running in parallel.">
                                        <IconButton sx={{ p: 0, ml: 1 }}>
                                            <HelpOutline fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

export default NodeInfoCard;