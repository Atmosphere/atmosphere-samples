/*
 * Copyright 2008-2020 Async-IO.org
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.nettosphere.samples.games;

import org.atmosphere.cpr.AtmosphereResource;

import java.util.ArrayDeque;
import java.util.Collection;
import java.util.Deque;

public class Snake {

    private static final int DEFAULT_LENGTH = 5;

    private final int id;
    private final AtmosphereResource resource;

    private Direction direction;
    private int length = DEFAULT_LENGTH;
    private Location head;
    private final Deque<Location> tail = new ArrayDeque<Location>();
    private final String hexColor;

    public Snake(int id, AtmosphereResource resource) {
        this.id = id;
        this.hexColor = SnakeWebSocket.getRandomHexColor();
        this.resource = resource;
        resetState();
    }

    private void resetState() {
        this.direction = Direction.NONE;
        this.head = SnakeWebSocket.getRandomLocation();
        this.tail.clear();
        this.length = DEFAULT_LENGTH;
    }

    private synchronized void kill() {
        resetState();
        sendMessage("{'type': 'dead'}");
    }

    private synchronized void reward() {
        length++;
        sendMessage("{'type': 'kill'}");
    }


    protected void sendMessage(String msg) {
        resource.getResponse().write(msg);
    }

    public synchronized void update(Collection<Snake> snakes) {
        Location nextLocation = head.getAdjacentLocation(direction);
        if (nextLocation.x >= SnakeWebSocket.PLAYFIELD_WIDTH) {
            nextLocation.x = 0;
        }
        if (nextLocation.y >= SnakeWebSocket.PLAYFIELD_HEIGHT) {
            nextLocation.y = 0;
        }
        if (nextLocation.x < 0) {
            nextLocation.x = SnakeWebSocket.PLAYFIELD_WIDTH;
        }
        if (nextLocation.y < 0) {
            nextLocation.y = SnakeWebSocket.PLAYFIELD_HEIGHT;
        }
        if (direction != Direction.NONE) {
            tail.addFirst(head);
            if (tail.size() > length) {
                tail.removeLast();
            }
            head = nextLocation;
        }

        handleCollisions(snakes);
    }

    private void handleCollisions(Collection<Snake> snakes) {
        for (Snake snake : snakes) {
            boolean headCollision = id != snake.id && snake.getHead().equals(head);
            boolean tailCollision = snake.getTail().contains(head);
            if (headCollision || tailCollision) {
                kill();
                if (id != snake.id) {
                    snake.reward();
                }
            }
        }
    }

    public synchronized Location getHead() {
        return head;
    }

    public synchronized Collection<Location> getTail() {
        return tail;
    }

    public synchronized void setDirection(Direction direction) {
        this.direction = direction;
    }

    public synchronized String getLocationsJson() {
        StringBuilder sb = new StringBuilder();
        sb.append(String.format("{x: %d, y: %d}",
                Integer.valueOf(head.x), Integer.valueOf(head.y)));
        for (Location location : tail) {
            sb.append(',');
            sb.append(String.format("{x: %d, y: %d}",
                    Integer.valueOf(location.x), Integer.valueOf(location.y)));
        }
        return String.format("{'id':%d,'body':[%s]}",
                Integer.valueOf(id), sb.toString());
    }

    public int getId() {
        return id;
    }

    public String getHexColor() {
        return hexColor;
    }
}
