#! /usr/bin/env ruby

# For experimenting with the stuff described in
# http://dotat.at/cgi/cvsweb/things/life.c?rev=1.8

LIVE = 1
DEAD = 0

state = {}

(0..1<<9).each do |bitmap|
  x = 0
  p bitmap
  (0..9).each do |y|
    if (bitmap & 1<<y)
      x += 1;
      if (bitmap & 020)
        if (x == 2 || x == 3)
          state[bitmap] = LIVE;
        else
          state[bitmap] = DEAD;
        end
      else
        if(x == 3)
          state[bitmap] = LIVE;
        else
          state[bitmap] = DEAD;
        end
      end
    end
  end
end

p state
