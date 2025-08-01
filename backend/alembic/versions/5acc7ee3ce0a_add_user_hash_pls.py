"""add user hash pls

Revision ID: 5acc7ee3ce0a
Revises: d53f7dd3b0e2
Create Date: 2025-08-01 18:31:57.796988

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5acc7ee3ce0a'
down_revision: Union[str, Sequence[str], None] = 'd53f7dd3b0e2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
