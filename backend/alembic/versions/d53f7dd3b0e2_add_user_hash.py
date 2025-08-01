"""add user hash

Revision ID: d53f7dd3b0e2
Revises: b9c1c2a0a8c0
Create Date: 2025-08-01 18:29:44.510455

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd53f7dd3b0e2'
down_revision: Union[str, Sequence[str], None] = 'b9c1c2a0a8c0'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
